import { resolve } from 'node:path'

import fetch from '@web-std/fetch'
import closeWithGrace from 'close-with-grace'
import { config as configEnv } from 'dotenv'
import { glob } from 'fast-glob'
import Fastify from 'fastify'

import logger from './logger'
import { OperationsClient } from './operations.client'
import { FireboomCustomizesPlugin } from './plugins/customize'
import { FireboomFunctionsPlugin } from './plugins/function'
import { FireboomHealthPlugin } from './plugins/health'
import type { FBFastifyRequest } from './plugins/hooks'
import { FireboomHooksPlugin } from './plugins/hooks'
import { FireboomProxiesPlugin } from './plugins/proxy'
import type { BaseRequestBody, HookServerConfiguration } from './types'

export async function startServer(
  config: HookServerConfiguration,
  hooks?: { onStartUp?: VoidFunction }
) {
  logger.level = config.logLevel || 'info'
  configEnv({ path: resolve(process.cwd(), config.envFilePath) })
  let id = 0
  const fastify = Fastify({
    logger,
    disableRequestLogging: true,
    genReqId: req => {
      if (req.headers['x-request-id']) {
        return req.headers['x-request-id']?.toString()
      }
      return `${++id}`
    }
  })
  fastify.log.level = 'silent'

  fastify.addHook('onRequest', (req, _reply, done) => {
    logger.debug({ req }, 'received request')
    done()
  })

  fastify.addHook('onResponse', (req, reply, done) => {
    logger.debug(
      { res: reply, url: req.raw.url, responseTime: reply.getResponseTime() },
      'request completed'
    )
    done()
  })

  fastify.decorateRequest('ctx', null)

  // health
  fastify.register(FireboomHealthPlugin, hooks)

  fastify.addHook('onRoute', routeOptions => {
    logger.info(`Registered router [${routeOptions.method}] with '${routeOptions.url}'`)
  })

  await fastify.register(async fastify => {
    fastify.addHook<FBFastifyRequest<BaseRequestBody, any>>('preHandler', async (req, reply) => {
      const clientRequest = req.body?.__wg?.clientRequest

      // client to call fireboom operations
      const operationsClient = new OperationsClient({
        baseURL: config.apiBaseURL,
        customFetch: fetch,
        requestTimeoutMs: 3000,
        clientRequest
      })

      req.ctx = {
        logger,
        user: req.body?.__wg?.user!,
        clientRequest,
        operationsClient
      }
    })

    // hooks
    await fastify.register(FireboomHooksPlugin)

    // customize
    await fastify.register(FireboomCustomizesPlugin)

    // proxy
    await fastify.register(FireboomProxiesPlugin)

    // functions
    await fastify.register(FireboomFunctionsPlugin)

    // auto require all hook functions
    const entries = await glob(
      resolve(
        process.cwd(),
        `./{authentication,customize,function,global,operation,upload,proxy}/**/*.${
          process.env.NODE_ENV === 'production' ? 'js' : 'ts'
        }`
      )
    )
    for (const entry of entries) {
      require(entry)
    }
  })

  // graceful shutdown
  closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err) {
      logger.error('Error when graceful shutdown Fireboom hook server', err)
    }
    await fastify.close()
    logger.info('Fireboom hook server is closed')
  })

  // start listen
  fastify.listen(config.listen, (err, address) => {
    if (err) {
      logger.error('Error when start Fireboom hook server', err)
    } else {
      logger.info(`Fireboom hook server is listening on: ${address}`)
    }
  })
}

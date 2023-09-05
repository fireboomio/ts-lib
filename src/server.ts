import 'dotenv/config'

import { Headers } from '@whatwg-node/fetch'
import closeWithGrace from 'close-with-grace'
import Fastify from 'fastify'
import { readFile } from 'fs/promises'

import { type FireboomConfiguration, resolveConfigurationVariable } from './configuration'
import logger from './logger'
import { FastifyRequestBody } from './types'

async function readConfig() {
  let config: FireboomConfiguration
  try {
    const configJson = await readFile('generated/fireboom.config.json')
    config = JSON.parse(configJson.toString())
  } catch (error) {
    throw new Error('Error when read fireboom.config.json ' + error)
  }
  if (!config.api?.serverOptions?.serverUrl) {
    throw new Error('"serverUrl" is not set in fireboom.config.json')
  }
  const serverUrl = resolveConfigurationVariable(config.api.serverOptions.serverUrl)
  if (!serverUrl) {
    throw new Error('"serverUrl" is not rightly set in fireboom.config.json')
  }
  if (!config.api?.serverOptions.listen?.host || !config.api?.serverOptions?.listen?.port) {
    throw new Error('"host" and "port" are not set in fireboom.config.json')
  }
  const host = resolveConfigurationVariable(config.api.serverOptions.listen.host)
  const port = resolveConfigurationVariable(config.api.serverOptions.listen.port)
  if (!host || !port) {
    throw new Error('"host" and "port" are not rightly set in fireboom.config.json')
  }
  return config
}

async function startFastifyServer(config: FireboomConfiguration) {
  let logLevel: string = 'debug'
  if (config.api?.serverOptions?.logger?.level) {
    const _level = resolveConfigurationVariable(config.api.serverOptions.logger.level)
    if (_level) {
      logLevel = _level
    }
  }
  logger.level = logLevel
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

  fastify.addHook('onRequest', (req, _reply, done) => {
    req.log.debug({ req }, 'received request')
    done()
  })

  fastify.addHook('onResponse', (req, reply, done) => {
    req.log.debug(
      { res: reply, url: req.raw.url, responseTime: reply.getResponseTime() },
      'request completed'
    )
    done()
  })

  await fastify.register(async _fastify => {
    //
  })

  // graceful shutdown
  closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err) {
      logger.error('Error when graceful shutdown Fireboom hook server', err)
    }
    await fastify.close()
    logger.info('Fireboom hook server is closed')
  })

  const host = resolveConfigurationVariable(config.api!.serverOptions!.listen!.host!)!
  const port = +resolveConfigurationVariable(config.api!.serverOptions!.listen!.port!)!
  // start listen
  fastify.listen(
    {
      host,
      port
    },
    (err, address) => {
      if (err) {
        logger.error('Error when start Fireboom hook server', err)
      } else {
        logger.info(`Fireboom hook server is listening on: ${address}`)
      }
    }
  )
}

export async function startServer() {
  let config: FireboomConfiguration
  try {
    config = await readConfig()
  } catch (error) {
    logger.error((error as Error).message)
    return
  }
  await startFastifyServer(config)
}

/**
 * createClientRequest returns a decoded client request, used for passing it to user code
 * @param body Request body
 * @returns Decoded client request
 */
export const createClientRequest = (body: FastifyRequestBody) => {
  // clientRequest represents the original client request that was sent initially to the WunderNode.
  const raw = rawClientRequest(body)
  return {
    headers: new Headers(raw?.headers),
    requestURI: raw?.requestURI || '',
    method: raw?.method || 'GET'
  }
}

/**
 * rawClientRequest returns the raw JSON encoded client request
 * @param body Request body
 * @returns Client request as raw JSON, as received in the request body
 */
export const rawClientRequest = (body: FastifyRequestBody) => {
  return body.__wg.clientRequest
}

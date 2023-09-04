import 'dotenv/config'

import closeWithGrace from 'close-with-grace'
import Fastify from 'fastify'
import { readFile } from 'fs/promises'

import { resolveConfigurationVariable } from './configuration'
import logger from './logger'
import { FireboomConfiguration } from './types'

async function readConfig() {
  try {
    const configJson = await readFile('generated/fireboom.config.json')
    const config: FireboomConfiguration = JSON.parse(configJson.toString())
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
  } catch (error) {
    throw new Error('Error when read fireboom.config.json')
  }
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

  fastify.addHook('onRequest', (req, reply, done) => {
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

  await fastify.register(async fastify => {
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

import 'dotenv/config'

import { readFile } from 'fs/promises'

import { resolveConfigurationVariable } from './configuration'
import logger from './logger'
import { WunderGraphConfiguration } from './types'

async function readConfig() {
  try {
    const configJson = await readFile('generated/fireboom.config.json')
    const config: WunderGraphConfiguration = JSON.parse(configJson.toString())
    if (config.api?.nodeOptions?.nodeUrl) {
      const nodeUrl = resolveConfigurationVariable(config.api.nodeOptions.nodeUrl)
      if (!nodeUrl) {
        logger.error('"nodeUrl" is rightly set in fireboom.config.json')
      } else {
        return config
      }
    } else {
      logger.error('"nodeUrl" is not set in fireboom.config.json')
    }
    return config
  } catch (error) {
    logger.error('Error when read fireboom.config.json')
  }
}

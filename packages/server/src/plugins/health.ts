import type { FastifyPluginAsync } from 'fastify'

import type { Health } from '../types'
import { Endpoint } from '../types'
import { getCustomizeNameList } from './customize'
import { getFunctionNameList } from './function'
import { getproxyNameList } from './proxy'

const startTime = new Date().toISOString()

export const FireboomHealthPlugin: FastifyPluginAsync = async fastify => {
  fastify.get<{ Reply: Health }>(Endpoint.Health, async (request, reply) => {
    return {
      status: 'ok',
      report: {
        customizes: getCustomizeNameList(),
        functions: getFunctionNameList(),
        proxys: getproxyNameList(),
        time: startTime
      }
    }
  })
}

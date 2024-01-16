import type { FastifyPluginAsync } from 'fastify'

import type { Health } from '../types'
import { Endpoint } from '../types'
import { getCustomizeNameList } from './customize'
import { getFunctionNameList } from './function'
import { getProxyNameList } from './proxy'

const startTime = new Date().toISOString()

let onStartUpCalled = false

export const FireboomHealthPlugin: FastifyPluginAsync = async (fastify, hooks?: { onStartUp?: VoidFunction }) => {
  fastify.get<{ Reply: Health }>(Endpoint.Health, async (request, reply) => {
    if (!onStartUpCalled) {
      onStartUpCalled = true
      hooks?.onStartUp?.()
    }
    return {
      status: 'ok',
      report: {
        customizes: getCustomizeNameList(),
        functions: getFunctionNameList(),
        proxys: getProxyNameList(),
        time: startTime
      }
    }
  })
}

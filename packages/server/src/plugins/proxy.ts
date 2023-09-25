import type { FastifyInstance, FastifyPluginAsync, FastifyReply } from 'fastify'

import { saveOperationConfig } from '../operation.json'
import type { BaseRequestContext, OnRequestHookPayload } from '../types'
import { Endpoint, HookParent, OperationExecutionEngine } from '../types'
import { replaceUrl } from '../utils'

export interface ProxyConfig {
  handler: (
    input: Record<string, any>,
    ctx: BaseRequestContext,
    reply: FastifyReply
  ) => Promise<void>
}

let fastify: FastifyInstance

let proxyNameList: string[]

export async function registerProxyHandler(path: string, config: ProxyConfig) {
  const routeUrl = replaceUrl(Endpoint.Proxy, { path })
  fastify.route<{ Body: OnRequestHookPayload }>({
    method: ['GET', 'POST'],
    url: routeUrl,
    async handler(req, reply) {
      // const request = {
      //   body: req.body,
      //   headers: req.headers,
      //   method: req.method,
      //   query: req.query
      // }
      let input = {}
      if (req.body.request.originBody) {
        try {
          input = JSON.parse(Buffer.from(req.body.request.originBody, 'base64').toString())
        } catch (error) {
          //
        }
      }
      try {
        await config.handler(input, req.ctx, reply)
      } catch (error) {
        reply.code(500).send(error)
      }
    }
  })
  saveOperationConfig(HookParent.Proxy, path, { engine: OperationExecutionEngine.ENGINE_PROXY })
  proxyNameList.push(path)
}

export const FireboomProxiesPlugin: FastifyPluginAsync = async _fastify => {
  fastify = _fastify
  proxyNameList = []
}

export function getproxyNameList() {
  return proxyNameList
}

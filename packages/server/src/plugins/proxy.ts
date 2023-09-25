import { URL } from 'node:url'

import type { FastifyInstance, FastifyPluginAsync, FastifyReply } from 'fastify'

import { saveOperationConfig } from '../operation.json'
import type { BaseRequestContext, OnRequestHookPayload, Request } from '../types'
import { Endpoint, HookParent, OperationExecutionEngine } from '../types'
import { replaceUrl } from '../utils'

export interface ProxyConfig {
  handler: (input: Request, ctx: BaseRequestContext, reply: FastifyReply) => Promise<void>
}

let fastify: FastifyInstance

let proxyNameList: string[]

export async function registerProxyHandler(path: string, config: ProxyConfig) {
  const routeUrl = replaceUrl(Endpoint.Proxy, { path })
  fastify.route<{ Body: OnRequestHookPayload }>({
    method: ['GET', 'POST'],
    url: routeUrl,
    async handler(req, reply) {
      // protocol & host is not used
      const url = new URL('http://localhost' + req.body.request.requestURI)
      const query = Object.fromEntries(url.searchParams)

      let body = {}
      if (req.body.request.originBody) {
        try {
          body = JSON.parse(Buffer.from(req.body.request.originBody, 'base64').toString())
        } catch (error) {
          //
        }
      }
      const request: Request = {
        body,
        headers: req.body.request.headers,
        method: req.body.request.method,
        query
      }
      try {
        await config.handler(request, req.ctx, reply)
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

import { Readable } from 'node:stream'

import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import type { ZodRawShape } from 'zod'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import type { JsonSchema7Type } from 'zod-to-json-schema/src/parseDef'
import type { JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object'

import { saveOperationConfig } from '../operation.json'
import type { BaseReuqestContext } from '../types'
import { Endpoint, HookParent, OperationExecutionEngine, OperationType } from '../types'
import { replaceUrl } from '../utils'

export type FunctionConfig<T extends ZodRawShape = any> = {
  input?: z.ZodObject<T> | JsonSchema7ObjectType
  response?: z.ZodFirstPartySchemaTypes | JsonSchema7Type
} & (
  | {
      operationType?: OperationType.QUERY | OperationType.MUTATION
      handler: (input: Record<string, any>, ctx: BaseReuqestContext) => Promise<any>
    }
  | {
      operationType: OperationType.SUBSCRIPTION
      handler: (input: Record<string, any>, ctx: BaseReuqestContext) => AsyncGenerator<any>
    }
)

let fastify: FastifyInstance

let functionNameList: string[]

export async function registerFunctionHandler(path: string, config: FunctionConfig) {
  const routeUrl = replaceUrl(Endpoint.Function, { path })
  const operationType = config.operationType || OperationType.QUERY
  const inputSchema =
    config.input instanceof z.ZodObject ? zodToJsonSchema(config.input) : config.input
  const responseSchema =
    config.response instanceof z.Schema ? zodToJsonSchema(config.response) : config.response

  fastify.post<{ Body: { input: Record<string, any> } }>(routeUrl, async (req, reply) => {
    reply.type('application/json')
    if (operationType === OperationType.QUERY || operationType === OperationType.MUTATION) {
      try {
        const data = await config.handler(req.body.input, req.ctx)
        reply.code(200).send({ response: { data } })
      } catch (error) {
        reply.code(500).send({ response: { error } })
      }
    } else {
      const subscribeOnce = req.headers['x-wg-subscribe-once'] === 'true'

      const readableStream = new Readable()
      readableStream._read = () => {}
      reply.send(readableStream)
      try {
        const gen = config.handler(req.body.input, req.ctx) as AsyncGenerator<object>

        for await (const next of gen) {
          readableStream.push(`${JSON.stringify({ data: next })}\n\n`)
          if (subscribeOnce) {
            readableStream.push(null)
            break
          }
        }
      } catch (error) {
        readableStream.push(`${JSON.stringify({ error })}`)
      }
      readableStream.destroy()

      return reply
    }
  })

  saveOperationConfig(HookParent.Function, path, {
    engine: OperationExecutionEngine.ENGINE_PROXY,
    operationType: config.operationType,
    variablesSchema: JSON.stringify(inputSchema),
    responseSchema: JSON.stringify(responseSchema)
  })
  functionNameList.push(path)
}

export const FireboomFunctionsPlugin: FastifyPluginAsync = async _fastify => {
  fastify = _fastify
  functionNameList = []
}

export function getFunctionNameList() {
  return functionNameList
}

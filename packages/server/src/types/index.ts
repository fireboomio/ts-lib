import type { IncomingHttpHeaders } from 'http'
import type { Logger } from 'pino'

import type { InternalOperationsDefinition, OperationsClient } from '../operations.client'
import type { User, WunderGraphRequest } from './server'
export type {
  InternalOperation,
  InternalOperationDefinition,
  InternalOperationsDefinition,
  OperationsClient,
  OperationsClientConfig
} from '../operations.client'

declare module 'fastify' {
  export interface FastifyRequest {
    ctx: BaseReuqestContext
  }
}

export type FireboomOperationsDefinition = InternalOperationsDefinition

export type BaseReuqestContext = {
  user: User
  logger: Logger
  clientRequest: WunderGraphRequest
  operationsClient: OperationsClient<FireboomOperationsDefinition>
}

export interface Request {
  body?: any
  headers: IncomingHttpHeaders
  method: string
  query: any
}

export type HookServerConfiguration = {
  listen: {
    host: string
    port: number
  }
  logLevel: string
  apiBaseURL: string
  envFilePath: string
}

export * from './server'

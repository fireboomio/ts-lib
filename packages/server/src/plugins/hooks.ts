import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

import type {
  BaseRequestBody,
  BaseRequestContext,
  InternalOperationsDefinition,
  MiddlewareHookResponse,
  OnRequestHookPayload,
  OnRequestHookResponse,
  OnResponseHookPayload,
  OnResponseHookResponse,
  OnWsConnectionInitHookPayload,
  OnWsConnectionInitHookResponse,
  OperationHookPayload,
  OperationHookPayload_response,
  RequestHeaders,
  UploadHookPayload,
  UploadHookResponse
} from '../types'
import { Endpoint, MiddlewareHook, UploadHook } from '../types'

export type SKIP = 'skip'
export type CANCEL = 'cancel'

// make some key as partial
export type PartialKey<T extends Record<string, any>, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P]
}
// remove void type
export type OmitVoid<T> = Pick<T, Exclude<keyof T, 'void'>>

export type PromiseFunction = (...args: any) => Promise<any>
export type AppendResponse<T extends PromiseFunction, Append> = (
  ...args: Parameters<T>
) => Promise<{ response: Awaited<ReturnType<T>> } & Append>
export type HeaderMutableFunction<T extends PromiseFunction> = AppendResponse<
  T,
  { headers?: RequestHeaders }
>
export type InputMutableFunction<T extends PromiseFunction> = AppendResponse<
  T,
  { input?: MiddlewareHookResponse['input'] }
>

export type MutatingPreResolveFunction<T extends PromiseFunction> = (
  ...args: Parameters<T>
) => Promise<
  OmitVoid<Awaited<ReturnType<T>>> & {
    headers?: RequestHeaders
    input?: MiddlewareHookResponse['input']
  }
>

export type VoidHookFunction<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
> = (ctx: BaseRequestContext<T>) => Promise<void>
export type CommonResponse = MiddlewareHookResponse['response']
export type WithResponseHookFunction<
  T extends InternalOperationsDefinition = InternalOperationsDefinition,
  R = CommonResponse
> = (ctx: BaseRequestContext<T>) => Promise<R>
export type GlobalHookFunction<
  Payload,
  T extends InternalOperationsDefinition = InternalOperationsDefinition,
  R = CommonResponse
> = (ctx: BaseRequestContext<T> & Payload) => Promise<R | SKIP | CANCEL>
export type OnConnectionInitHookFunction<
  Payload,
  T extends InternalOperationsDefinition = InternalOperationsDefinition,
  R = CommonResponse
> = (ctx: BaseRequestContext<T> & Payload) => Promise<R>
export type OperationHookFunction<
  I = OperationHookPayload['input'],
  R = CommonResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
> = (ctx: BaseRequestContext<T> & { input: I }) => Promise<R>
export type OperationWithoutResponseHookFunction<
  I = OperationHookPayload['input'],
  T extends InternalOperationsDefinition = InternalOperationsDefinition
> = (ctx: BaseRequestContext<T> & { input: I }) => Promise<void>
export type OperationWithResponseHookFunction<
  I = OperationHookPayload['input'],
  R = CommonResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
> = (
  ctx: BaseRequestContext<T> & { input: I; response: OperationHookPayload_response }
) => Promise<R>

export type PreUploadHookFunction<
  Meta = any,
  R = CommonResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
> = (
  ctx: BaseRequestContext<T> & Omit<UploadHookPayload, '__wg' | 'error' | 'meta'> & { meta: Meta }
) => Promise<R>
export type PostUploadHookFunction<
  Meta = any,
  R = CommonResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
> = (
  ctx: BaseRequestContext<T> & Omit<UploadHookPayload, '__wg' | 'meta'> & { meta: Meta }
) => Promise<R>

export type FBHookResponse<R = CommonResponse> =
  | Required<Pick<MiddlewareHookResponse, 'hook'> & { error: unknown }>
  | Partial<
      Pick<MiddlewareHookResponse, 'hook' | 'op' | 'setClientRequestHeaders'> & { response: R }
    >
export type FBFastifyRequest<B, R = CommonResponse> = { Body: B; Reply: FBHookResponse<R> }

let fastify: FastifyInstance

function authenticationPreHandler(req: FastifyRequest, reply: FastifyReply): boolean {
  if (req.ctx.user === undefined) {
    req.log.error("User context doesn't exist")
    reply.code(400).send({ error: "User context doesn't exist" })
    return false
  }
  return true
}

export function registerPostAuthentication<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: VoidHookFunction<T>) {
  fastify.post<FBFastifyRequest<BaseRequestBody>>(
    Endpoint.PostAuthentication,
    async (request, reply) => {
      if (authenticationPreHandler(request, reply)) {
        try {
          await fn(request.ctx)
        } catch (err) {
          request.log.error(err)
          reply.code(500).send({ hook: MiddlewareHook.PostAuthentication, error: err })
        }
        reply.code(200).send({
          hook: MiddlewareHook.PostAuthentication
        })
      }
    }
  )
}

export function registerMutatingPostAuthentication<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: HeaderMutableFunction<WithResponseHookFunction<T>>) {
  fastify.post<FBFastifyRequest<BaseRequestBody>>(
    Endpoint.MutatingPostAuthentication,
    async (request, reply) => {
      if (authenticationPreHandler(request, reply)) {
        try {
          const out = await fn(request.ctx)
          reply.code(200).send({
            hook: MiddlewareHook.MutatingPostAuthentication,
            response: out.response,
            setClientRequestHeaders: out.headers
          })
        } catch (err) {
          request.log.error(err)
          reply.code(500).send({ hook: MiddlewareHook.MutatingPostAuthentication, error: err })
        }
      }
    }
  )
}

export function registerRevalidate<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: HeaderMutableFunction<WithResponseHookFunction<T>>) {
  fastify.post<FBFastifyRequest<BaseRequestBody>>(
    Endpoint.RevalidateAuthentication,
    async (request, reply) => {
      if (authenticationPreHandler(request, reply)) {
        try {
          const out = await fn(request.ctx)
          reply.code(200).send({
            hook: MiddlewareHook.RevalidateAuthentication,
            response: out.response,
            setClientRequestHeaders: out.headers
          })
        } catch (err) {
          request.log.error(err)
          reply.code(500).send({ hook: MiddlewareHook.RevalidateAuthentication, error: err })
        }
      }
    }
  )
}

export function registerPostLogout<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: HeaderMutableFunction<WithResponseHookFunction<T>>) {
  fastify.post<FBFastifyRequest<BaseRequestBody>>(Endpoint.PostLogout, async (request, reply) => {
    if (authenticationPreHandler(request, reply)) {
      try {
        const out = await fn(request.ctx)
        reply.code(200).send({
          hook: MiddlewareHook.PostLogout,
          response: out.response,
          setClientRequestHeaders: out.headers
        })
      } catch (err) {
        request.log.error(err)
        reply.code(500).send({ hook: MiddlewareHook.PostLogout, error: err })
      }
    }
  })
}

export function registerBeforeOriginRequest<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: GlobalHookFunction<OnRequestHookPayload, T, OnRequestHookResponse['request']>) {
  fastify.post<FBFastifyRequest<OnRequestHookPayload>>(
    Endpoint.BeforeOriginRequest,
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const maybeHookOut = await fn({ ...request.ctx, ...request.body })
        const hookOut = maybeHookOut || 'skip'
        return {
          op: request.body.operationName,
          hook: MiddlewareHook.BeforeOriginRequest,
          response: {
            skip: hookOut === 'skip',
            cancel: hookOut === 'cancel',
            request: hookOut !== 'skip' && hookOut !== 'cancel' ? { ...hookOut } : undefined
          }
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { hook: MiddlewareHook.BeforeOriginRequest, error: err }
      }
    }
  )
}

export function registerAfterOriginResponse<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: GlobalHookFunction<OnResponseHookPayload, T, OnResponseHookResponse['response']>) {
  fastify.post<
    FBFastifyRequest<OnResponseHookPayload, PartialKey<OnResponseHookResponse, 'response'>>
  >(Endpoint.AfterOriginResponse, async (request, reply) => {
    reply.type('application/json').code(200)
    try {
      const maybeHookOut = await fn({ ...request.ctx, ...request.body })
      const hookOut = maybeHookOut || 'skip'
      return {
        op: request.body.operationName,
        hook: MiddlewareHook.AfterOriginResponse,
        response: {
          skip: hookOut === 'skip',
          cancel: hookOut === 'cancel',
          response: hookOut !== 'skip' && hookOut !== 'cancel' ? { ...hookOut } : undefined
        }
      }
    } catch (err) {
      request.log.error(err)
      reply.code(500)
      return { hook: MiddlewareHook.AfterOriginResponse, error: err }
    }
  })
}

export function registerOnOriginRequest<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: GlobalHookFunction<OnRequestHookPayload, T, OnRequestHookResponse['request']>) {
  fastify.post<FBFastifyRequest<OnRequestHookPayload>>(
    Endpoint.OnOriginRequest,
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const maybeHookOut = await fn({ ...request.ctx, ...request.body })
        const hookOut = maybeHookOut || 'skip'
        return {
          op: request.body.operationName,
          hook: MiddlewareHook.OnOriginRequest,
          response: {
            skip: hookOut === 'skip',
            cancel: hookOut === 'cancel',
            request: hookOut !== 'skip' && hookOut !== 'cancel' ? { ...hookOut } : undefined
          }
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { hook: MiddlewareHook.OnOriginRequest, error: err }
      }
    }
  )
}

export function registerOnOriginResponse<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(fn: GlobalHookFunction<OnResponseHookPayload, T, OnResponseHookResponse['response']>) {
  fastify.post<
    FBFastifyRequest<OnResponseHookPayload, PartialKey<OnResponseHookResponse, 'response'>>
  >(Endpoint.OnOriginResponse, async (request, reply) => {
    reply.type('application/json').code(200)
    try {
      const maybeHookOut = await fn({ ...request.ctx, ...request.body })
      const hookOut = maybeHookOut || 'skip'
      return {
        op: request.body.operationName,
        hook: MiddlewareHook.OnOriginResponse,
        response: {
          skip: hookOut === 'skip',
          cancel: hookOut === 'cancel',
          response: hookOut !== 'skip' && hookOut !== 'cancel' ? { ...hookOut } : undefined
        }
      }
    } catch (err) {
      request.log.error(err)
      reply.code(500)
      return { hook: MiddlewareHook.OnOriginResponse, error: err }
    }
  })
}

export function registerOnConnectionInit<
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  fn: OnConnectionInitHookFunction<OnWsConnectionInitHookPayload, T, OnWsConnectionInitHookResponse>
) {
  fastify.post<FBFastifyRequest<OnWsConnectionInitHookPayload, OnWsConnectionInitHookResponse>>(
    Endpoint.OnConnectionInit,
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const out = await fn({ ...request.ctx, ...request.body })
        return {
          hook: MiddlewareHook.OnConnectionInit,
          response: out
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { hook: MiddlewareHook.OnOriginResponse, error: err }
      }
    }
  )
}

export function registerMockResolve<
  OperationInput extends OperationHookPayload['input'],
  OperationResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  operationName: string,
  fn: HeaderMutableFunction<OperationHookFunction<OperationInput, OperationResponse, T>>
) {
  fastify.post<FBFastifyRequest<OperationHookPayload>>(
    Endpoint.MockResolve.replace('{path}', operationName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const out = await fn({ ...request.ctx, input: request.body.input })
        return {
          op: operationName,
          hook: MiddlewareHook.MockResolve,
          response: out.response,
          setClientRequestHeaders: out.headers
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { op: operationName, hook: MiddlewareHook.MockResolve, error: err }
      }
    }
  )
}

export function registerPreResolve<
  OperationInput extends OperationHookPayload['input'],
  OperationResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(operationName: string, fn: OperationHookFunction<OperationInput, OperationResponse, T>) {
  fastify.post<FBFastifyRequest<OperationHookPayload>>(
    Endpoint.PreResolve.replace('{path}', operationName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        await fn({ ...request.ctx, input: request.body.input })
        return {
          op: operationName,
          hook: MiddlewareHook.PreResolve,
          setClientRequestHeaders: request.ctx.clientRequest.headers
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { op: operationName, hook: MiddlewareHook.PreResolve, error: err }
      }
    }
  )
}

export function registerPostResolve<
  OperationInput extends OperationHookPayload['input'],
  OperationResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  operationName: string,
  fn: OperationWithResponseHookFunction<OperationInput, OperationResponse, T>
) {
  fastify.post<FBFastifyRequest<OperationHookPayload>>(
    Endpoint.PostResolve.replace('{path}', operationName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        await fn({
          ...request.ctx,
          input: request.body.input,
          response: request.body.response
        })
        return {
          op: operationName,
          hook: MiddlewareHook.PostResolve,
          setClientRequestHeaders: request.ctx.clientRequest.headers
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { op: operationName, hook: MiddlewareHook.PostResolve, error: err }
      }
    }
  )
}

export function registerMutatingPreResolve<
  OperationInput extends OperationHookPayload['input'],
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  operationName: string,
  fn: MutatingPreResolveFunction<OperationWithoutResponseHookFunction<OperationInput, T>>
) {
  fastify.post<FBFastifyRequest<OperationHookPayload>>(
    Endpoint.MutatingPreResolve.replace('{path}', operationName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const out = await fn({ ...request.ctx, input: request.body.input })
        return {
          op: operationName,
          hook: MiddlewareHook.MutatingPreResolve,
          input: out.input,
          setClientRequestHeaders: out.headers
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { op: operationName, hook: MiddlewareHook.MutatingPreResolve, error: err }
      }
    }
  )
}

export function registerMutatingPostResolve<
  OperationInput extends OperationHookPayload['input'],
  OperationResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  operationName: string,
  fn: HeaderMutableFunction<OperationWithResponseHookFunction<OperationInput, OperationResponse, T>>
) {
  fastify.post<FBFastifyRequest<OperationHookPayload>>(
    Endpoint.MutatingPostResolve.replace('{path}', operationName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const out = await fn({
          ...request.ctx,
          input: request.body.input,
          response: request.body.response
        })
        return {
          op: operationName,
          hook: MiddlewareHook.MutatingPostResolve,
          response: out.response,
          setClientRequestHeaders: out.headers
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { op: operationName, hook: MiddlewareHook.MutatingPostResolve, error: err }
      }
    }
  )
}

export function registerCustomResolve<
  OperationInput extends OperationHookPayload['input'],
  OperationResponse,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  operationName: string,
  fn: HeaderMutableFunction<OperationHookFunction<OperationInput, OperationResponse, T>>
) {
  fastify.post<FBFastifyRequest<OperationHookPayload>>(
    Endpoint.CustomResolve.replace('{path}', operationName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const out = await fn({
          ...request.ctx,
          input: request.body.input
        })
        return {
          op: operationName,
          hook: MiddlewareHook.CustomResolve,
          response: out.response || null,
          setClientRequestHeaders: out.headers
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { op: operationName, hook: MiddlewareHook.CustomResolve, error: err }
      }
    }
  )
}

export function registerPreUpload<
  Meta = any,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  providerName: string,
  profileName: string,
  fn: PreUploadHookFunction<Meta, UploadHookResponse, T>
) {
  fastify.post<FBFastifyRequest<UploadHookPayload>>(
    Endpoint.PreUpload.replace('{provider}', providerName).replace('{profile}', profileName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const out = await fn({
          ...request.ctx,
          file: request.body.file,
          meta: request.body.meta
        })
        return {
          hook: UploadHook.PreUpload,
          response: out
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { error: err }
      }
    }
  )
}

export function registerPostUpload<
  Meta = any,
  T extends InternalOperationsDefinition = InternalOperationsDefinition
>(
  providerName: string,
  profileName: string,
  fn: PostUploadHookFunction<Meta, UploadHookResponse, T>
) {
  fastify.post<FBFastifyRequest<UploadHookPayload>>(
    Endpoint.PostUpload.replace('{provider}', providerName).replace('{profile}', profileName),
    async (request, reply) => {
      reply.type('application/json').code(200)
      try {
        const out = await fn({
          ...request.ctx,
          file: request.body.file,
          meta: request.body.meta,
          error: request.body.error
        })
        return {
          hook: UploadHook.PostUpload,
          response: out
        }
      } catch (err) {
        request.log.error(err)
        reply.code(500)
        return { error: err }
      }
    }
  )
}

export const FireboomHooksPlugin: FastifyPluginAsync = async _fastify => {
  fastify = _fastify
}

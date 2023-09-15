export type { FireboomExecutionContext, GraphQLServerConfig } from './plugins/customize'
export { registerCustomizeGraphQL } from './plugins/customize'
export type { FunctionConfig } from './plugins/function'
export { registerFunctionHandler } from './plugins/function'
export {
  registerBeforeOriginRequest,
  registerCustomResolve,
  registerMockResolve,
  registerMutatingPostAuthentication,
  registerMutatingPostResolve,
  registerMutatingPreResolve,
  registerOnOriginRequest,
  registerOnOriginResponse,
  registerPostAuthentication,
  registerPostLogout,
  registerPostResolve,
  registerPostUpload,
  registerPreResolve,
  registerPreUpload,
  registerRevalidate
} from './plugins/hooks'
export type { ProxyConfig } from './plugins/proxy'
export { registerProxyHandler } from './plugins/proxy'
export { startServer } from './server'
export * from './types'

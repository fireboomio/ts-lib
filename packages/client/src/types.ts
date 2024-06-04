import type { RequiredKeysOf, SetRequired } from 'type-fest'

import type { ValidationError } from './error'
import type { S3UploadProfile, User } from './types.server'

export type Headers = HeadersInit
export type PromiseOr<T> = T | Promise<T>

export type ClientResponse<Data = any, Error = any> = {
  data?: Data
  error?: Error
}

export type ValidationResponseJSON = {
  errors: ValidationError[]
  message: string
  input: object
}

export type LogoutResponse = {
  redirect?: string
}

export type LogoutOptions = {
  /**
   * Whether to log out the user from the OpenID Connect provider.
   * Some providers might require the user to visit a URL. See
   * the redirect field.
   */
  logoutOpenidConnectProvider?: boolean
  /**
   * Custom function for redirecting the client to the log out
   * URL. If not provided, window.location.href is updated.
   */
  redirect?: (url: string) => Promise<boolean>
  /**
   * Callback to be run after a succesful logout
   * */
  after?: () => void
}

export type UploadResponse = {
  fileKeys: string[]
}

export type UploadRequestOptions<
  ProviderName = string,
  ProfileName = string,
  Meta = any
> = (ProfileName extends never | undefined
  ? {
      profile?: ProfileName
    }
  : {
      profile: ProfileName
    }) & {
  provider: ProviderName
  files: FileList | File[]
  abortSignal?: AbortSignal
  directory?: string
  meta?: Meta
}

export type OperationMetadata = Record<
  string,
  {
    requiresAuthentication: boolean
  }
>

export type FetchUserRequestOptions = {
  abortSignal?: AbortSignal
  revalidate?: boolean
}

export type OperationRequestOptions<
  OperationName extends string = any,
  Input extends object | undefined = object | undefined
> = {
  operationName: OperationName
  /**
   * If you pass an AbortSignal, the request will be aborted when the signal is aborted.
   * You are responsible of handling the request timeout if you want to pass a custom AbortSignal.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  abortSignal?: AbortSignal
  input?: Input
  headers?: Headers
  /**
   * api specified timeout
   */
  timeout?: number
} & Pick<ClientConfig, 'requestInterceptor' | 'responseInterceptor'>

export type HasRequiredInput<Input extends object | undefined> = Input extends object
  ? RequiredKeysOf<Input> extends never
    ? false
    : true
  : false

export type WithInput<
  Input extends object | undefined,
  Options extends { input?: Input }
> = HasRequiredInput<Input> extends true ? SetRequired<Options, 'input'> : Options

export type QueryRequestOptions<
  OperationName extends string = any,
  Input extends object | undefined = object | undefined
> = WithInput<Input, OperationRequestOptions<OperationName, Input>> & {
  subscribeOnce?: boolean
}

export type MutationRequestOptions<
  OperationName extends string = any,
  Input extends object | undefined = object | undefined
> = WithInput<Input, OperationRequestOptions<OperationName, Input>>

export type LowLevelRequestOptions<OperationName extends string = any> = Omit<
  OperationRequestOptions<OperationName, undefined>,
  'input'
> & {
  customInit?: (init: Pick<FetchOptions, 'headers' | 'timeout' | 'signal' | 'requestInterceptor' | 'responseInterceptor'>) => FetchOptions
}

export type SubscriptionRequestOptions<
  OperationName extends string = any,
  Input extends object | undefined = object | undefined
> = WithInput<Input, OperationRequestOptions<OperationName, Input>> & {
  /**
   * Subscribe to a live query
   */
  liveQuery?: boolean
  /**
   * Receive the initial response and then stop the subscription
   */
  subscribeOnce?: boolean
}

export type SubscriptionResult = {
  streamState: 'streaming' | 'stopped' | 'restarting'
  data: any
}

export type SubscriptionEventHandler<Data = any, ResponseError = any> = (
  resp: ClientResponse<Data, ResponseError>
) => void

export type ClientConfig = {
  applicationHash?: string
  baseURL: string
  sdkVersion?: string
  customFetch?: (url: string, init?: RequestInit) => Promise<globalThis.Response>
  extraHeaders?: Headers
  operationMetadata?: OperationMetadata
  /**
   * Specifies the number of milliseconds before the request times out.
   * default is `0` (no timeout)
   */
  requestTimeoutMs?: number
  csrfEnabled?: boolean
  /**
   * Force SSE for subscriptions if extraHeaders are set.
   * Subscriptions fall back to fetch streaming by default
   * if extraHeaders are set, because EventSource does not
   * supported headers.
   */
  forceSSE?: boolean
  /**
   * Force method for internal operation to use POST method
   * but not GET/POST
   */
  forceMethod?: string
  /**
   * run before fetch request
   */
  requestInterceptor?: RequestInterceptor
  /**
   * run after fetch request
   */
  responseInterceptor?: ResponseInterceptor
}

export type FetchOptions = RequestInit & {
  timeout?: number
} & Pick<ClientConfig, 'requestInterceptor' | 'responseInterceptor'>

export type UploadValidationOptions = Partial<Omit<S3UploadProfile, 'hooks' | 'metadataJSONSchema'>>

export interface ClientOperation {
  input?: object
  liveQuery?: boolean
  response: ClientResponse
  requiresAuthentication: boolean
}

export type S3ProviderDefinition = Record<
  string,
  {
    hasProfiles: boolean
    profiles: Record<string, object>
  }
>

export interface OperationsDefinition<
  Queries extends OperationDefinition = OperationDefinition,
  Mutations extends OperationDefinition = OperationDefinition,
  Subscriptions extends OperationDefinition = OperationDefinition,
  LiveQueries extends OperationDefinition = OperationDefinition,
  UserRole extends string = string,
  S3Provider extends S3ProviderDefinition = S3ProviderDefinition,
  AuthProvider extends string = string
> {
  user: User<UserRole>
  s3Provider: S3Provider
  authProvider: AuthProvider
  queries: Queries
  mutations: Mutations
  subscriptions: Subscriptions
  liveQueries: LiveQueries
}

export type OperationDefinition = Record<string, ClientOperation>

export type S3ClientInfo = {
  useSSL: boolean
  bucketName: string
  endpoint: string
}

export type ExtractProfileName<Profile> = keyof Profile extends never
  ? undefined
  : Extract<keyof Profile, string>

export type ExtractMeta<
  Profiles extends Record<string, object>,
  ProfileName extends string | undefined
> = ProfileName extends string ? Profiles[ProfileName] : never

type RequestInterceptorArg = { url: string; init: RequestInit }
export type RequestInterceptor = (
  args: RequestInterceptorArg
) => PromiseOr<RequestInterceptorArg | null | undefined | void>

type ResponseInterceptorArgs = RequestInterceptorArg & { response: Response }
export type ResponseInterceptor = (
  args: ResponseInterceptorArgs
) => PromiseOr<Response | null | undefined | void>

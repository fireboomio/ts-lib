import type { RequiredKeysOf, SetRequired } from 'type-fest'

import type { GraphQLError, ValidationError } from './error'

export type Headers = Record<string, any>

// @ts-ignore
export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>

// @ts-ignore
export type JSONObject = Record<string, JSONValue>

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

export type UploadRequestOptions<ProviderName = any, ProfileName = any, Meta = any> = {
  provider: ProviderName
  files: FileList
  abortSignal?: AbortSignal
  directory?: string
  meta?: Meta
} & (ProfileName extends never | undefined
  ? {
      profile?: ProfileName
    }
  : {
      profile: ProfileName
    })

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
}

export type GraphQLResponse<
  ResponseData extends JSONObject = any,
  ResponseError extends GraphQLError = any
> = {
  data?: ResponseData
  errors?: ResponseError[]
}

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
  subscribeOnce?: Boolean
}

export type MutationRequestOptions<
  OperationName extends string = any,
  Input extends object | undefined = object | undefined
> = WithInput<Input, OperationRequestOptions<OperationName, Input>>

export type SubscriptionRequestOptions<
  OperationName extends string = any,
  Input extends object | undefined = object | undefined
> = WithInput<Input, OperationRequestOptions<OperationName, Input>> & {
  /**
   * Subscribe to a live query
   */
  liveQuery?: Boolean
  /**
   * Receive the initial response and then stop the subscription
   */
  subscribeOnce?: Boolean
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
  customFetch?: (input: RequestInfo, init?: RequestInit) => Promise<globalThis.Response>
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
}

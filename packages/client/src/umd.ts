import { Client } from './client'
import type {
  ClientConfig,
  ClientResponse,
  FetchUserRequestOptions,
  Headers,
  LogoutOptions,
  MutationRequestOptions,
  QueryRequestOptions,
  S3ClientInfo,
  SubscriptionEventHandler,
  SubscriptionRequestOptions,
  UploadRequestOptions,
  UploadValidationOptions
} from './types'

let client: Client
let s3Providers: Record<string, S3ClientInfo> = {}

function init(
  options: Omit<ClientConfig, 'forceMethod'>,
  _s3Providers?: Record<string, S3ClientInfo>
) {
  client = new Client(options)
  s3Providers = _s3Providers ?? {}
}

init({ baseURL: 'http://localhost:9991' })

export default {
  init,
  query: ['queries'].reduce<
    Record<
      string,
      (options: Omit<QueryRequestOptions, 'operationName'>) => Promise<ClientResponse<any, Error>>
    >
  >((obj, q) => {
    const func = (options: Omit<QueryRequestOptions, 'operationName'>) => {
      return client.query({
        operationName: q,
        ...options
      })
    }
    obj[q] = func
    return obj
  }, {}),
  mutation: ['mutations'].reduce<
    Record<
      string,
      (
        options: Omit<MutationRequestOptions, 'operationName'>
      ) => Promise<ClientResponse<any, Error>>
    >
  >((obj, q) => {
    const func = (options: Omit<MutationRequestOptions, 'operationName'>) => {
      return client.mutate({
        operationName: q,
        ...options
      })
    }
    obj[q] = func
    return obj
  }, {}),
  subscription: ['subscriptions'].reduce<
    Record<
      string,
      (
        options: Omit<SubscriptionRequestOptions, 'operationName'>,
        cb?: SubscriptionEventHandler<any, Error>
      ) => Promise<ClientResponse<any, Error>> | Promise<any> | void
    >
  >((obj, q) => {
    const func = (
      options: Omit<SubscriptionRequestOptions, 'operationName'>,
      cb?: SubscriptionEventHandler<any, Error>
    ) => {
      return client.subscribe(
        {
          operationName: q,
          ...options
        },
        cb
      )
    }
    obj[q] = func
    return obj
  }, {}),
  setBaseURL: (url: string) => client.setBaseURL(url),
  fetchUser: (options?: FetchUserRequestOptions) => client.fetchUser(options),
  hasExtraHeaders: () => client.hasExtraHeaders(),
  isAuthenticatedOperation: (operationName: string) =>
    client.isAuthenticatedOperation(operationName),
  login: (authProviderID: string, redirectURI?: string) =>
    client.login(authProviderID, redirectURI),
  logout: (options?: LogoutOptions) => client.logout(options),
  setAuthorizationToken: (token: string) => client.setAuthorizationToken(token),
  setExtraHeaders: (headers: Headers) => client.setExtraHeaders(headers),
  unsetAuthorization: () => client.unsetAuthorization(),
  uploadFiles: (
    config: UploadRequestOptions & { appendEndpoint?: boolean },
    validation?: UploadValidationOptions
  ) => {
    return client.uploadFiles(config, validation).then(resp => {
      if (config.appendEndpoint !== false) {
        const { useSSL, bucketName, endpoint } = s3Providers[config.provider] ?? {}
        resp.fileKeys = resp.fileKeys.map(
          k => `${useSSL ? `https://` : `http://`}${bucketName}.${endpoint}/${k}`
        )
      }
      return resp
    })
  },
  validateFiles: (config: UploadRequestOptions, validation?: UploadValidationOptions) =>
    client.validateFiles(config, validation)
}

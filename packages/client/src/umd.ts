import { Client } from './client'
import type {
  ClientConfig,
  ClientResponse,
  FetchUserRequestOptions,
  Headers,
  LogoutOptions,
  MutationRequestOptions,
  QueryRequestOptions,
  SubscriptionEventHandler,
  SubscriptionRequestOptions,
  UploadRequestOptions
} from './types'
import type { S3UploadProfile } from './types.server'

let client: Client

function init(options: Omit<ClientConfig, 'forceMethod'>) {
  client = new Client(options)
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
  uploadFiles: (config: UploadRequestOptions, validation?: S3UploadProfile) =>
    client.uploadFiles(config, validation),
  validateFiles: (config: UploadRequestOptions, validation?: S3UploadProfile) =>
    client.validateFiles(config, validation)
}

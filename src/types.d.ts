export interface ClientRequestHeaders extends Headers {}

export type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'
  | 'CONNECT'
  | 'TRACE'

export interface ClientRequest {
  method: RequestMethod
  requestURI: string
  /**
   * Contains all client request headers. You can manipulate the map to add or remove headers.
   * This might impact upstream hooks. Global hooks don't take changes into account.
   */
  headers: ClientRequestHeaders
}

export interface FastifyRequestBody {
  __wg: { user?: FireboomUser; clientRequest?: ClientRequest }
}

// Changed the default type of Role to any.
// It should be worked on
export interface FireboomUser<Role extends string = any, CustomClaims extends {} = {}> {
  provider?: string
  providerId?: string
  userId?: string
  /**
   * expires indicates the Unix timestamp in milliseconds when the user expires. After that,
   * if needs to be revalidated (via the revalidate hook) in order to take effect. If expires
   * is <= 0 or undefined, the session lasts forever.
   *
   * @default undefined
   */
  expires?: number
  name?: string
  firstName?: string
  lastName?: string
  middleName?: string
  nickName?: string
  preferredUsername?: string
  profile?: string
  picture?: string
  website?: string
  email?: string
  emailVerified?: boolean
  gender?: string
  birthDate?: string
  zoneInfo?: string
  locale?: string
  location?: string

  roles?: Role[]
  customAttributes?: string[]
  customClaims?: {
    [key: string]: any
  } & CustomClaims
  accessToken?: JSONObject
  rawAccessToken?: string
  idToken?: JSONObject
  rawIdToken?: string
}

export interface OperationHookFunction {
  (...args: any[]): Promise<any>
}

export interface OperationHooksConfiguration<AsyncFn = OperationHookFunction> {
  mockResolve?: AsyncFn
  preResolve?: AsyncFn
  postResolve?: AsyncFn
  mutatingPreResolve?: AsyncFn
  mutatingPostResolve?: AsyncFn
  customResolve?: AsyncFn
}

export interface FireboomFile {
  /**
   * Filename of the file, as returned by the browser.
   */
  readonly name: string
  /**
   * Size of the file, in bytes
   */
  readonly size: number
  /**
   * File mimetype
   */
  readonly type: string
}

export interface PreUploadHookRequest<User extends WunderGraphUser = WunderGraphUser> {
  /**
   * The user that is currently logged in, if any.
   */
  user?: User
  /**
   * File to be uploaded
   */
  file: FireboomFile
  /**
   * Metadata received from the client
   */
  meta: any
}

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>

export type JSONObject = { [key: string]: JSONValue }

export type SKIP = 'skip'

// use CANCEL to skip the hook and cancel the request / response chain
// this is semantically equal to throwing an error (500)
export type CANCEL = 'cancel'

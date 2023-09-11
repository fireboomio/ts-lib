export type ServerLogging = {
  level: ConfigurationVariable
}

export type FetchConfiguration = {
  baseUrl: ConfigurationVariable
  body: ConfigurationVariable
  header: FetchConfiguration_header
  mTLS: MTLSConfiguration
  method: number
  path: ConfigurationVariable
  query: URLQueryConfiguration[]
  upstreamAuthentication: UpstreamAuthentication
  url: ConfigurationVariable
  urlEncodeBody: boolean
}

export type UserDefinedApi = {
  allowedHostNames: ConfigurationVariable[]
  authenticationConfig: ApiAuthenticationConfig
  corsConfiguration: CorsConfiguration
  enableGraphqlEndpoint: boolean
  engineConfiguration: EngineConfiguration
  invalidOperationNames: string[]
  nodeOptions: NodeOptions
  operations: Operation[]
  proxyRequests: string[]
  s3UploadConfiguration: S3UploadConfiguration[]
  serverOptions: ServerOptions
  webhooks: WebhookConfiguration[]
}

export type OpenIDConnectAuthProviderConfig = {
  clientId: ConfigurationVariable
  clientSecret: ConfigurationVariable
  issuer: ConfigurationVariable
  queryParameters: OpenIDConnectQueryParameter[]
}

export type NodeLogging = {
  level: ConfigurationVariable
}

export type JwksAuthProvider = {
  jwksJson: ConfigurationVariable
  jwksUrl: ConfigurationVariable
  userInfoCacheTtlSeconds: number
  userInfoEndpoint: ConfigurationVariable
}

export type DataSourceConfiguration = {
  childNodes: TypeField[]
  customDatabase: DataSourceCustom_Database
  customGraphql: DataSourceCustom_GraphQL
  customRest: DataSourceCustom_REST
  customRestMap: DataSourceConfiguration_customRestMap
  customStatic: DataSourceCustom_Static
  directives: DirectiveConfiguration[]
  id: string
  kind: number
  overrideFieldPathFromAlias: boolean
  requestTimeoutSeconds: number
  rootNodes: TypeField[]
}

export type GraphqlOperationFile = {
  api_mount_path: string
  authorization_config: OperationAuthorizationConfig
  content: string
  file_path: string
  index: number
  internal: boolean
  interpolation_variables_refs: string[]
  operation_name: string
  operation_type: number
  origin_content: string
  variables_refs: string[]
}

export type BaseRequestBodyWg = {
  clientRequest: WunderGraphRequest
  user: User
}

export type WunderGraphRequest_headers = Record<string, any>

export type HealthReport = {
  customizes: string[]
  functions: string[]
  proxys: string[]
  time: string
}

export type VariableInjectionConfiguration = {
  dateFormat: string
  environmentVariableName: string
  fromHeaderName: string
  variableKind: number
  variablePathComponents: string[]
}

export type PostResolveGetTransformation = {
  convertMap: PostResolveGetTransformation_convertMap
  dateTimeFormat: string
  deleteFrom: boolean
  from: string[]
  to: string[]
}

export type GithubAuthProviderConfig = {
  clientId: ConfigurationVariable
  clientSecret: ConfigurationVariable
}

export type UpstreamAuthentication = {
  jwtConfig: JwtUpstreamAuthenticationConfig
  jwtWithAccessTokenExchangeConfig: JwtUpstreamAuthenticationWithAccessTokenExchange
  kind: number
}

export type OperationCacheConfig = {
  enabled: boolean
  maxAge: number
  public: boolean
  staleWhileRevalidate: number
}

export type ListenerOptions = {
  host: ConfigurationVariable
  port: ConfigurationVariable
}

export type User = {
  accessToken?: string
  birthDate?: string
  customAttributes?: string[]
  customClaims?: User_customClaims
  email?: string
  emailVerified?: boolean
  etag?: string
  firstName?: string
  fromCookie?: boolean
  gender?: string
  idToken?: string
  lastName?: string
  locale?: string
  location?: string
  middleName?: string
  name?: string
  nickName?: string
  picture?: string
  preferredUsername?: string
  profile?: string
  provider?: string
  providerId?: string
  rawAccessToken?: string
  rawIdToken?: string
  roles: string[]
  userId?: string
  website?: string
  zoneInfo?: string
}

export type WunderGraphResponse_headers = Record<string, any>

export type HTTPHeader = {
  values: ConfigurationVariable[]
}

export type MockResolveHookConfiguration = {
  enabled: boolean
  subscriptionPollingIntervalMillis: number
}

export type TypeConfiguration = {
  renameTo: string
  typeName: string
}

export type FetchConfiguration_header = Record<string, HTTPHeader>

export type OpenIDConnectQueryParameter = {
  name: ConfigurationVariable
  value: ConfigurationVariable
}

export type DirectiveConfiguration = {
  directiveName: string
  renameTo: string
}

export type PostResolveGetTransformation_convertMap = Record<string, any>

export type OperationHooksConfiguration_tsPathMap = Record<string, any>

export type QuoteField = {
  indexes: number[]
}

export type WunderGraphResponse = {
  body?: string
  headers: WunderGraphResponse_headers
  method: string
  originBody?: string
  requestURI: string
  status: string
  statusCode: number
}

export type OperationHookPayload_setClientRequestHeaders = Record<string, any>

export type WebhookConfiguration = {
  filePath: string
  name: string
  verifier: WebhookVerifier
}

export type DataSourceCustom_REST = {
  defaultTypeName: string
  fetch: FetchConfiguration
  statusCodeTypeMappings: StatusCodeTypeMapping[]
  subscription: RESTSubscriptionConfiguration
}

export type CorsConfiguration = {
  allowCredentials: boolean
  allowedHeaders: string[]
  allowedMethods: string[]
  allowedOrigins: ConfigurationVariable[]
  exposedHeaders: string[]
  maxAge: number
}

export type JwksBasedAuthentication = {
  providers: JwksAuthProvider[]
}

export type TypeField_quotes = Record<string, QuoteField>

export type FieldConfiguration = {
  argumentsConfiguration: ArgumentConfiguration[]
  disableDefaultFieldMapping: boolean
  fieldName: string
  path: string[]
  requiresFields: string[]
  typeName: string
  unescapeResponseJson: boolean
}

export type OperationAuthenticationConfig = {
  authRequired: boolean
}

export type BaseRequestBody = {
  __wg: BaseRequestBodyWg
}

export type MiddlewareHookResponse_setClientRequestHeaders = Record<string, any>

export type MiddlewareHookResponse = {
  ClientResponseStatusCode: number
  error?: string
  hook: string
  input: any
  op: string
  response: any
  setClientRequestHeaders: MiddlewareHookResponse_setClientRequestHeaders
}

export type ConfigurationVariable = {
  environmentVariableDefaultValue?: string
  environmentVariableName?: string
  kind: number
  placeholderVariableName?: string
  staticVariableContent?: string
}

export type S3UploadConfiguration = {
  accessKeyID: ConfigurationVariable
  bucketLocation: ConfigurationVariable
  bucketName: ConfigurationVariable
  endpoint: ConfigurationVariable
  name: string
  secretAccessKey: ConfigurationVariable
  uploadProfiles: S3UploadConfiguration_uploadProfiles
  useSSL: boolean
}

export type EngineConfiguration = {
  datasourceConfigurations: DataSourceConfiguration[]
  defaultFlushInterval: number
  fieldConfigurations: FieldConfiguration[]
  graphqlSchema: string
  typeConfigurations: TypeConfiguration[]
}

export type ArgumentConfiguration = {
  name: string
  renameTypeTo: string
  renderConfiguration: number
  sourcePath: string[]
  sourceType: number
}

export type ServerOptions = {
  listen: ListenerOptions
  logger: ServerLogging
  serverUrl: ConfigurationVariable
}

export type OnRequestHookResponse = {
  cancel: boolean
  request: WunderGraphRequest
  skip: boolean
}

export type CookieBasedAuthentication = {
  authorizedRedirectUriRegexes: ConfigurationVariable[]
  authorizedRedirectUris: ConfigurationVariable[]
  blockKey: ConfigurationVariable
  csrfSecret: ConfigurationVariable
  hashKey: ConfigurationVariable
  providers: AuthProvider[]
}

export type CustomClaim = {
  jsonPathComponents: string[]
  name: string
  required: boolean
  type: number
}

export type OperationHooksConfiguration = {
  customResolve: boolean
  httpTransportBeforeRequest: boolean
  httpTransportOnRequest: boolean
  httpTransportOnResponse: boolean
  mockResolve: MockResolveHookConfiguration
  mutatingPostResolve: boolean
  mutatingPreResolve: boolean
  onConnectionInit: boolean
  postResolve: boolean
  preResolve: boolean
  tsPathMap?: OperationHooksConfiguration_tsPathMap
}

export type S3UploadProfile = {
  allowedFileExtensions: string[]
  allowedMimeTypes: string[]
  hooks: S3UploadProfileHooksConfiguration
  maxAllowedFiles: number
  maxAllowedUploadSizeBytes: number
  metadataJSONSchema: string
  requireAuthentication: boolean
}

export type OperationsConfig = {
  definitions: Schemas
  function_operation_files: ExtensionOperationFile[]
  graphql_operation_files: GraphqlOperationFile[]
  invalids?: string[]
  proxy_operation_files: ExtensionOperationFile[]
}

export type SchemaRef = Record<string, any>

export type Health = {
  report: HealthReport
  status: string
}

export type UploadHookPayload_error = {
  message: string
  name: string
}

export type UploadHookResponse = {
  error: string
  fileKey: string
}

export type GraphQLSubscriptionConfiguration = {
  enabled: boolean
  url: ConfigurationVariable
  useSSE: boolean
}

export type OperationLiveQueryConfig = {
  enabled: boolean
  pollingIntervalSeconds: number
}

export type SingleTypeField = {
  fieldName: string
  typeName: string
}

export type StatusCodeTypeMapping = {
  injectStatusCodeIntoBody: boolean
  statusCode: number
  typeName: string
}

export type OnResponseHookPayload = {
  operationName: string
  operationType: string
  response: WunderGraphResponse
}

export type OnWsConnectionInitHookResponse = {
  payload: any
}

export type WunderGraphConfiguration = {
  api: UserDefinedApi
  apiId: string
  apiName: string
  dangerouslyEnableGraphQLEndpoint: boolean
  deploymentName: string
  environmentIds: string[]
}

export type JwtUpstreamAuthenticationConfig = {
  secret: ConfigurationVariable
  signingMethod: number
}

export type DataSourceCustom_GraphQL = {
  customScalarTypeFields: SingleTypeField[]
  federation: GraphQLFederationConfiguration
  fetch: FetchConfiguration
  hooksConfiguration: GraphQLDataSourceHooksConfiguration
  subscription: GraphQLSubscriptionConfiguration
  upstreamSchema: string
}

export type Operation = {
  authenticationConfig: OperationAuthenticationConfig
  authorizationConfig: OperationAuthorizationConfig
  cacheConfig: OperationCacheConfig
  content: string
  datasourceQuotes: string[]
  enableTransaction: boolean
  engine: number
  hooksConfiguration: OperationHooksConfiguration
  injectedVariablesSchema: string
  internal: boolean
  internalVariablesSchema: string
  interpolationVariablesSchema: string
  liveQueryConfig: OperationLiveQueryConfig
  name: string
  operationType: number
  originContent: string
  path: string
  postResolveTransformations: PostResolveTransformation[]
  responseSchema: string
  variablesConfiguration: OperationVariablesConfiguration
  variablesSchema: string
}

export type URLQueryConfiguration = {
  name: string
  value: string
}

export type AuthProvider = {
  githubConfig: GithubAuthProviderConfig
  id: string
  kind: number
  oidcConfig: OpenIDConnectAuthProviderConfig
}

export type ExtensionOperationFile = {
  api_mount_path: string
  authorization_config: OperationAuthorizationConfig
  file_path: string
  module_path: string
  operation_name: string
  operation_type: number
}

export type JwtUpstreamAuthenticationWithAccessTokenExchange = {
  accessTokenExchangeEndpoint: ConfigurationVariable
  secret: ConfigurationVariable
  signingMethod: number
}

export type S3UploadProfileHooksConfiguration = {
  postUpload: boolean
  preUpload: boolean
}

export type ApiAuthenticationHooks = {
  mutatingPostAuthentication: boolean
  postAuthentication: boolean
  postLogout: boolean
  revalidateAuthentication: boolean
  tsPathMap?: ApiAuthenticationHooks_tsPathMap
}

export type DataSourceCustom_Database = {
  closeTimeoutSeconds: number
  databaseURL: ConfigurationVariable
  graphqlSchema: string
  jsonInputVariables: string[]
  jsonTypeFields: SingleTypeField[]
  prismaSchema: string
}

export type DataSourceCustom_Static = {
  data: ConfigurationVariable
}

export type MutatingPostAuthenticationResponse = {
  message: string
  status: string
  user: User
}

export type RequestError = {
  locations?: Location[]
  message: string
  path: ErrorPath
}

export type HookFile = {
  name: string
  provider: string
  size: number
  type: string
}

export type OperationAuthorizationConfig = {
  claims: ClaimConfig[]
  roleConfig: OperationRoleConfig
}

export type PostResolveTransformation = {
  depth: number
  get: PostResolveGetTransformation
  kind: number
}

export type NodeOptions = {
  defaultRequestTimeoutSeconds: number
  listen: ListenerOptions
  logger: NodeLogging
  nodeUrl: ConfigurationVariable
  publicNodeUrl: ConfigurationVariable
}

export type RESTSubscriptionConfiguration = {
  enabled: boolean
  pollingIntervalMillis: number
  skipPublishSameResponse: boolean
}

export type OperationRoleConfig = {
  denyMatchAll: string[]
  denyMatchAny: string[]
  requireMatchAll: string[]
  requireMatchAny: string[]
}

export type User_customClaims = Record<string, any>

export type WunderGraphRequest = {
  body?: string
  headers: WunderGraphRequest_headers
  method: string
  originBody?: string
  requestURI: string
}

export type ApiAuthenticationHooks_tsPathMap = Record<string, any>

export type TypeField = {
  fieldNames: string[]
  quotes?: TypeField_quotes
  typeName: string
}

export type WebhookVerifier = {
  kind: number
  secret: ConfigurationVariable
  signatureHeader: string
  signatureHeaderPrefix: string
}

export type GraphQLDataSourceHooksConfiguration = {
  onWSTransportConnectionInit: boolean
}

export type S3UploadConfiguration_uploadProfiles = Record<string, S3UploadProfile>

export type OperationVariablesConfiguration = {
  injectVariables: VariableInjectionConfiguration[]
  keyReplaces: PostResolveGetTransformation[]
  valReplaces: PostResolveGetTransformation[]
}

export type ClaimConfig = {
  claimType: number
  custom: CustomClaim
  variablePathComponents: string[]
}

export type DataSourceConfiguration_customRestMap = Record<string, DataSourceCustom_REST>

export type Schemas = Record<string, SchemaRef>

export type OnRequestHookPayload = {
  argsAllowList: string[]
  operationName: string
  operationType: string
  request: WunderGraphRequest
}

export type OnWsConnectionInitHookPayload = {
  dataSourceId: string
  request: WunderGraphRequest
}

export type OperationHookPayload = {
  __wg: BaseRequestBodyWg
  hook: MiddlewareHook
  input: any
  op: string
  response: OperationHookPayloadResponse
  setClientRequestHeaders: OperationHookPayload_setClientRequestHeaders
}

export type OperationHookPayloadResponse = {
  data: any
  errors: RequestError[]
}

export type ErrorPath = Record<string, any>

export type UploadHookPayload = {
  __wg: BaseRequestBodyWg
  error: UploadHookPayload_error
  file: HookFile
  meta: any
}

export type MTLSConfiguration = {
  cert: ConfigurationVariable
  insecureSkipVerify: boolean
  key: ConfigurationVariable
}

export type GraphQLFederationConfiguration = {
  enabled: boolean
  serviceSdl: string
}

export type ApiAuthenticationConfig = {
  cookieBased: CookieBasedAuthentication
  hooks: ApiAuthenticationHooks
  jwksBased: JwksBasedAuthentication
  publicClaims: string[]
}

export type OnResponseHookResponse = {
  cancel: boolean
  response: WunderGraphResponse
  skip: boolean
}

export type Location = {
  column: number
  line: number
}

export enum HookParent {
  Authentication = 'authentication',
  Customize = 'customize',
  Fragment = 'fragment',
  Function = 'function',
  Generated = 'generated',
  Global = 'global',
  Operation = 'operation',
  Proxy = 'proxy',
  Storage = 'storage'
}
export enum MiddlewareHook {
  BeforeOriginRequest = 'beforeOriginRequest',
  CustomResolve = 'customResolve',
  MockResolve = 'mockResolve',
  MutatingPostAuthentication = 'mutatingPostAuthentication',
  MutatingPostResolve = 'mutatingPostResolve',
  MutatingPreResolve = 'mutatingPreResolve',
  OnConnectionInit = 'onConnectionInit',
  OnOriginRequest = 'onOriginRequest',
  OnOriginResponse = 'onOriginResponse',
  PostAuthentication = 'postAuthentication',
  PostLogout = 'postLogout',
  PostResolve = 'postResolve',
  PreResolve = 'preResolve',
  RevalidateAuthentication = 'revalidateAuthentication'
}
export enum UploadHook {
  PreUpload = 'preUpload',
  PostUpload = 'postUpload'
}

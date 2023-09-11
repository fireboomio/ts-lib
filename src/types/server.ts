export type SingleTypeField = {
  fieldName: string
  typeName: string
}
export type DataSourceConfiguration_customRestMap = Record<string, DataSourceCustom_REST>
export type TypeField = {
  fieldNames: string[]
  quotes?: TypeField_quotes
  typeName: string
}
export type Discriminator = {
  mapping?: Discriminator_mapping
  propertyName: string
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
export type ExtensionOperationFile = {
  api_mount_path: string
  authorization_config: OperationAuthorizationConfig
  file_path: string
  module_path: string
  operation_name: string
  operation_type: OperationType
}
export type WebhookConfiguration = {
  filePath: string
  name: string
  verifier: WebhookVerifier
}
export type FetchConfiguration = {
  baseUrl: ConfigurationVariable
  body: ConfigurationVariable
  header: FetchConfiguration_header
  mTLS: MTLSConfiguration
  method: HTTPMethod
  path: ConfigurationVariable
  query: URLQueryConfiguration[]
  upstreamAuthentication: UpstreamAuthentication
  url: ConfigurationVariable
  urlEncodeBody: boolean
}
export type DataSourceCustom_REST = {
  defaultTypeName: string
  fetch: FetchConfiguration
  statusCodeTypeMappings: StatusCodeTypeMapping[]
  subscription: RESTSubscriptionConfiguration
}
export type MutatingPostAuthenticationResponse = {
  message: string
  status: string
  user: User
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
  kind: DataSourceKind
  overrideFieldPathFromAlias: boolean
  requestTimeoutSeconds: number
  rootNodes: TypeField[]
}
export type TypeField_quotes = Record<string, QuoteField>
export type ApiAuthenticationHooks = {
  mutatingPostAuthentication: boolean
  postAuthentication: boolean
  postLogout: boolean
  revalidateAuthentication: boolean
}
export type Schema = {
  additionalProperties?: AdditionalProperties
  allOf?: SchemaRefs
  allowEmptyValue?: boolean
  anyOf?: SchemaRefs
  default?: any
  deprecated?: boolean
  description?: string
  discriminator?: Discriminator
  enum?: any[]
  example?: any
  exclusiveMaximum?: boolean
  exclusiveMinimum?: boolean
  externalDocs?: ExternalDocs
  format?: string
  items?: SchemaRef
  maxItems?: number
  maxLength?: number
  maxProperties?: number
  maximum?: number
  minItems?: number
  minLength?: number
  minProperties?: number
  minimum?: number
  multipleOf?: number
  not?: SchemaRef
  nullable?: boolean
  oneOf?: SchemaRefs
  pattern?: string
  properties?: Schemas
  readOnly?: boolean
  required?: string[]
  title?: string
  type?: string
  uniqueItems?: boolean
  writeOnly?: boolean
  xml?: XML
}
export type OperationAuthenticationConfig = {
  authRequired: boolean
}
export type DataSourceCustom_Database = {
  closeTimeoutSeconds: number
  databaseURL: ConfigurationVariable
  graphqlSchema: string
  jsonInputVariables: string[]
  jsonTypeFields: SingleTypeField[]
  prismaSchema: string
}
export type NodeLogging = {
  level: ConfigurationVariable
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
  operation_type: OperationType
  origin_content: string
  variables_refs: string[]
}
export type MiddlewareHookResponse = {
  ClientResponseStatusCode: number
  error?: string
  hook: string
  input: any
  op: string
  response: any
  setClientRequestHeaders: MiddlewareHookResponse_setClientRequestHeaders
}
export type OnWsConnectionInitHookPayload = {
  dataSourceId: string
  request: WunderGraphRequest
}
export type RequestError = {
  locations?: Location[]
  message: string
  path: ErrorPath
}
export type UploadHookResponse = {
  error: string
  fileKey: string
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
export type GraphQLFederationConfiguration = {
  enabled: boolean
  serviceSdl: string
}
export type S3UploadProfileHooksConfiguration = {
  postUpload: boolean
  preUpload: boolean
}
export type PostResolveGetTransformation_convertMap = Record<string, string>
export type OnResponseHookPayload = {
  operationName: string
  operationType: string
  response: WunderGraphResponse
}
export type StatusCodeTypeMapping = {
  injectStatusCodeIntoBody: boolean
  statusCode: number
  typeName: string
}
export type FetchConfiguration_header = Record<string, HTTPHeader>
export type DataSourceCustom_GraphQL = {
  customScalarTypeFields: SingleTypeField[]
  federation: GraphQLFederationConfiguration
  fetch: FetchConfiguration
  hooksConfiguration: GraphQLDataSourceHooksConfiguration
  subscription: GraphQLSubscriptionConfiguration
  upstreamSchema: string
}
export type ServerOptions = {
  listen: ListenerOptions
  logger: ServerLogging
  serverUrl: ConfigurationVariable
}
export type MTLSConfiguration = {
  cert: ConfigurationVariable
  insecureSkipVerify: boolean
  key: ConfigurationVariable
}
export type EngineConfiguration = {
  datasourceConfigurations: DataSourceConfiguration[]
  defaultFlushInterval: number
  fieldConfigurations: FieldConfiguration[]
  graphqlSchema: string
  typeConfigurations: TypeConfiguration[]
}
export type WunderGraphResponse_headers = Record<string, string>
export type CorsConfiguration = {
  allowCredentials: boolean
  allowedHeaders: string[]
  allowedMethods: string[]
  allowedOrigins: ConfigurationVariable[]
  exposedHeaders: string[]
  maxAge: number
}
export type PostResolveGetTransformation = {
  convertMap: PostResolveGetTransformation_convertMap
  dateTimeFormat: string
  deleteFrom: boolean
  from: string[]
  to: string[]
}
export type Location = {
  column: number
  line: number
}
export type ApiAuthenticationConfig = {
  cookieBased: CookieBasedAuthentication
  hooks: ApiAuthenticationHooks
  jwksBased: JwksBasedAuthentication
  publicClaims: string[]
}
export type JwtUpstreamAuthenticationWithAccessTokenExchange = {
  accessTokenExchangeEndpoint: ConfigurationVariable
  secret: ConfigurationVariable
  signingMethod: SigningMethod
}
export type SchemaRefs = SchemaRef[]
export type GraphQLSubscriptionConfiguration = {
  enabled: boolean
  url: ConfigurationVariable
  useSSE: boolean
}
export type DataSourceCustom_Static = {
  data: ConfigurationVariable
}
export type OnRequestHookResponse = {
  cancel: boolean
  request: WunderGraphRequest
  skip: boolean
}
export type UploadHookPayload_error = {
  message: string
  name: string
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
}
export type OperationRoleConfig = {
  denyMatchAll: string[]
  denyMatchAny: string[]
  requireMatchAll: string[]
  requireMatchAny: string[]
}
export type ErrorPath = Record<string, any>
export type MockResolveHookConfiguration = {
  enabled: boolean
  subscriptionPollingIntervalMillis: number
}
export type XML = {
  attribute?: boolean
  name?: string
  namespace?: string
  prefix?: string
  wrapped?: boolean
}
export type WunderGraphConfiguration = {
  api: UserDefinedApi
  apiId: string
  apiName: string
  dangerouslyEnableGraphQLEndpoint: boolean
  deploymentName: string
  environmentIds: string[]
}
export type GraphQLDataSourceHooksConfiguration = {
  onWSTransportConnectionInit: boolean
}
export type ExternalDocs = {
  description?: string
  url?: string
}
export type ArgumentConfiguration = {
  name: string
  renameTypeTo: string
  renderConfiguration: ArgumentRenderConfiguration
  sourcePath: string[]
  sourceType: ArgumentSource
}
export type JwksBasedAuthentication = {
  providers: JwksAuthProvider[]
}
export type HTTPHeader = {
  values: ConfigurationVariable[]
}
export type AuthProvider = {
  githubConfig: GithubAuthProviderConfig
  id: string
  kind: AuthProviderKind
  oidcConfig: OpenIDConnectAuthProviderConfig
}
export type QuoteField = {
  indexes: number[]
}
export type ClaimConfig = {
  claimType: ClaimType
  custom: CustomClaim
  variablePathComponents: string[]
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
export type ConfigurationVariable = {
  environmentVariableDefaultValue?: string
  environmentVariableName?: string
  kind: ConfigurationVariableKind
  placeholderVariableName?: string
  staticVariableContent?: string
}
export type NodeOptions = {
  defaultRequestTimeoutSeconds: number
  listen: ListenerOptions
  logger: NodeLogging
  nodeUrl: ConfigurationVariable
  publicNodeUrl: ConfigurationVariable
}
export type MiddlewareHookResponse_setClientRequestHeaders = Record<string, string>
export type OperationHookPayload_setClientRequestHeaders = Record<string, string>
export type HookFile = {
  name: string
  provider: string
  size: number
  type: string
}
export type FieldConfiguration = {
  argumentsConfiguration: ArgumentConfiguration[]
  disableDefaultFieldMapping: boolean
  fieldName: string
  path: string[]
  requiresFields: string[]
  typeName: string
  unescapeResponseJson: boolean
}
export type S3UploadConfiguration_uploadProfiles = Record<string, S3UploadProfile>
export type URLQueryConfiguration = {
  name: string
  value: string
}
export type Schemas = Record<string, SchemaRef>
export type User_customClaims = Record<string, any>
export type OnRequestHookPayload = {
  argsAllowList: string[]
  operationName: string
  operationType: string
  request: WunderGraphRequest
}
export type OnResponseHookResponse = {
  cancel: boolean
  response: WunderGraphResponse
  skip: boolean
}
export type UploadHookPayload = {
  __wg: BaseRequestBodyWg
  error: UploadHookPayload_error
  file: HookFile
  meta: any
}
export type OperationVariablesConfiguration = {
  injectVariables: VariableInjectionConfiguration[]
  keyReplaces: PostResolveGetTransformation[]
  valReplaces: PostResolveGetTransformation[]
}
export type GithubAuthProviderConfig = {
  clientId: ConfigurationVariable
  clientSecret: ConfigurationVariable
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
export type SchemaRef = {
  Ref: string
  Value: Schema
}
export type WunderGraphRequest_headers = Record<string, string>
export type HealthReport = {
  customizes: string[]
  functions: string[]
  proxys: string[]
  time: string
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
export type ServerLogging = {
  level: ConfigurationVariable
}
export type Discriminator_mapping = Record<string, string>
export type CookieBasedAuthentication = {
  authorizedRedirectUriRegexes: ConfigurationVariable[]
  authorizedRedirectUris: ConfigurationVariable[]
  blockKey: ConfigurationVariable
  csrfSecret: ConfigurationVariable
  hashKey: ConfigurationVariable
  providers: AuthProvider[]
}
export type DirectiveConfiguration = {
  directiveName: string
  renameTo: string
}
export type OperationHookPayload_response = {
  data: any
  errors: RequestError[]
}
export type CustomClaim = {
  jsonPathComponents: string[]
  name: string
  required: boolean
  type: ValueType
}
export type JwtUpstreamAuthenticationConfig = {
  secret: ConfigurationVariable
  signingMethod: number
}
export type OperationsConfig = {
  definitions: Schemas
  function_operation_files: ExtensionOperationFile[]
  graphql_operation_files: GraphqlOperationFile[]
  invalids?: string[]
  proxy_operation_files: ExtensionOperationFile[]
}
export type OperationLiveQueryConfig = {
  enabled: boolean
  pollingIntervalSeconds: number
}
export type VariableInjectionConfiguration = {
  dateFormat: string
  environmentVariableName: string
  fromHeaderName: string
  variableKind: InjectVariableKind
  variablePathComponents: string[]
}
export type PostResolveTransformation = {
  depth: number
  get: PostResolveGetTransformation
  kind: PostResolveTransformationKind
}
export type TypeConfiguration = {
  renameTo: string
  typeName: string
}
export type Operation = {
  authenticationConfig: OperationAuthenticationConfig
  authorizationConfig: OperationAuthorizationConfig
  cacheConfig: OperationCacheConfig
  content: string
  datasourceQuotes: string[]
  enableTransaction: boolean
  engine: OperationExecutionEngine
  hooksConfiguration: OperationHooksConfiguration
  injectedVariablesSchema: string
  internal: boolean
  internalVariablesSchema: string
  interpolationVariablesSchema: string
  liveQueryConfig: OperationLiveQueryConfig
  name: string
  operationType: OperationType
  originContent: string
  path: string
  postResolveTransformations: PostResolveTransformation[]
  responseSchema: string
  variablesConfiguration: OperationVariablesConfiguration
  variablesSchema: string
}
export type OpenIDConnectAuthProviderConfig = {
  clientId: ConfigurationVariable
  clientSecret: ConfigurationVariable
  issuer: ConfigurationVariable
  queryParameters: OpenIDConnectQueryParameter[]
}
export type AdditionalProperties = {
  Has: boolean
  Schema: SchemaRef
}
export type OpenIDConnectQueryParameter = {
  name: ConfigurationVariable
  value: ConfigurationVariable
}
export type UpstreamAuthentication = {
  jwtConfig: JwtUpstreamAuthenticationConfig
  jwtWithAccessTokenExchangeConfig: JwtUpstreamAuthenticationWithAccessTokenExchange
  kind: UpstreamAuthenticationKind
}
export type OperationAuthorizationConfig = {
  claims: ClaimConfig[]
  roleConfig: OperationRoleConfig
}
export type WebhookVerifier = {
  kind: WebhookVerifierKind
  secret: ConfigurationVariable
  signatureHeader: string
  signatureHeaderPrefix: string
}
export type BaseRequestBody = {
  __wg: BaseRequestBodyWg
}
export type OperationCacheConfig = {
  enabled: boolean
  maxAge: number
  public: boolean
  staleWhileRevalidate: number
}
export type WunderGraphRequest = {
  body?: string
  headers: WunderGraphRequest_headers
  method: string
  originBody?: string
  requestURI: string
}
export type BaseRequestBodyWg = {
  clientRequest: WunderGraphRequest
  user: User
}
export type RESTSubscriptionConfiguration = {
  enabled: boolean
  pollingIntervalMillis: number
  skipPublishSameResponse: boolean
}
export type JwksAuthProvider = {
  jwksJson: ConfigurationVariable
  jwksUrl: ConfigurationVariable
  userInfoCacheTtlSeconds: number
  userInfoEndpoint: ConfigurationVariable
}
export type ListenerOptions = {
  host: ConfigurationVariable
  port: ConfigurationVariable
}
export type OperationHookPayload = {
  __wg: BaseRequestBodyWg
  hook: MiddlewareHook
  input: any
  op: string
  response: OperationHookPayload_response
  setClientRequestHeaders: OperationHookPayload_setClientRequestHeaders
}
export type Health = {
  report: HealthReport
  status: string
}
export type OnWsConnectionInitHookResponse = {
  payload: any
}

export enum ArgumentRenderConfiguration {
  RENDER_ARGUMENT_DEFAULT = 0,
  RENDER_ARGUMENT_AS_GRAPHQL_VALUE = 1,
  RENDER_ARGUMENT_AS_ARRAY_CSV = 2,
  RENDER_ARGUMENT_AS_JSON_VALUE = 3
}
export enum ArgumentSource {
  OBJECT_FIELD = 0,
  FIELD_ARGUMENT = 1
}
export enum AuthProviderKind {
  AuthProviderGithub = 0,
  AuthProviderOIDC = 1,
  AuthProviderAuth0 = 2
}
export enum ClaimType {
  PROVIDER = 0,
  USERID = 1,
  WEBSITE = 10,
  EMAIL = 11,
  EMAIL_VERIFIED = 12,
  GENDER = 13,
  BIRTH_DATE = 14,
  ZONE_INFO = 15,
  LOCALE = 16,
  LOCATION = 17,
  ROLES = 18,
  NAME = 2,
  GIVEN_NAME = 3,
  FAMILY_NAME = 4,
  MIDDLE_NAME = 5,
  NICKNAME = 6,
  PREFERRED_USERNAME = 7,
  PROFILE = 8,
  PICTURE = 9,
  CUSTOM = 999
}
export enum ConfigurationVariableKind {
  STATIC_CONFIGURATION_VARIABLE = 0,
  ENV_CONFIGURATION_VARIABLE = 1,
  PLACEHOLDER_CONFIGURATION_VARIABLE = 2
}
export enum DataSourceKind {
  STATIC = 0,
  REST = 1,
  GRAPHQL = 2,
  POSTGRESQL = 3,
  MYSQL = 4,
  SQLSERVER = 5,
  MONGODB = 6,
  SQLITE = 7,
  PRISMA = 8
}
export enum HTTPMethod {
  GET = 0,
  POST = 1,
  PUT = 2,
  DELETE = 3,
  OPTIONS = 4,
  CONNECT = 5,
  HEAD = 6,
  PATCH = 7,
  TRACE = 8
}
export enum InjectVariableKind {
  UUID = 0,
  DATE_TIME = 1,
  ENVIRONMENT_VARIABLE = 2,
  FROM_HEADER = 3
}
export enum MiddlewareHook {
  PreResolve = 'preResolve',
  MutatingPreResolve = 'mutatingPreResolve',
  MockResolve = 'mockResolve',
  CustomResolve = 'customResolve',
  PostResolve = 'postResolve',
  MutatingPostResolve = 'mutatingPostResolve',
  PostAuthentication = 'postAuthentication',
  MutatingPostAuthentication = 'mutatingPostAuthentication',
  RevalidateAuthentication = 'revalidateAuthentication',
  PostLogout = 'postLogout',
  BeforeOriginRequest = 'beforeOriginRequest',
  OnOriginRequest = 'onOriginRequest',
  OnOriginResponse = 'onOriginResponse',
  OnConnectionInit = 'onConnectionInit'
}
export enum OperationExecutionEngine {
  ENGINE_GRAPHQL = 0,
  ENGINE_FUNCTION = 1,
  ENGINE_PROXY = 2
}
export enum OperationType {
  QUERY = 0,
  MUTATION = 1,
  SUBSCRIPTION = 2
}
export enum PostResolveTransformationKind {
  GET_POST_RESOLVE_TRANSFORMATION = 0
}
export enum SigningMethod {
  SigningMethodHS256 = 0
}
export enum UploadHook {
  PreUpload = 'preUpload',
  PostUpload = 'postUpload'
}
export enum UpstreamAuthenticationKind {
  UpstreamAuthenticationJWT = 0,
  UpstreamAuthenticationJWTWithAccessTokenExchange = 1
}
export enum ValueType {
  STRING = 0,
  INT = 1,
  FLOAT = 2,
  BOOLEAN = 3,
  ARRAY = 4
}
export enum WebhookVerifierKind {
  HMAC_SHA256 = 0
}
export enum CustomizeFlag {
  GraphqlEndpoint = '${graphqlEndpoint}',
  __schema = '__schema',
  Subscription = 'subscription'
}
export enum Endpoint {
  MutatingPostAuthentication = '/authentication/mutatingPostAuthentication',
  PostAuthentication = '/authentication/postAuthentication',
  PostLogout = '/authentication/postLogout',
  RevalidateAuthentication = '/authentication/revalidateAuthentication',
  Function = '/function/{path}',
  BeforeOriginRequest = '/global/httpTransport/beforeOriginRequest',
  OnOriginRequest = '/global/httpTransport/onOriginRequest',
  OnOriginResponse = '/global/httpTransport/onOriginResponse',
  OnConnectionInit = '/global/wsTransport/onConnectionInit',
  Customize = '/gqls/{name}/graphql',
  Health = '/health',
  _internalRequest = '/internal/operations/{path}',
  CustomResolve = '/operation/{path}/customResolve',
  MockResolve = '/operation/{path}/mockResolve',
  MutatingPostResolve = '/operation/{path}/mutatingPostResolve',
  MutatingPreResolve = '/operation/{path}/mutatingPreResolve',
  PostResolve = '/operation/{path}/postResolve',
  PreResolve = '/operation/{path}/preResolve',
  Proxy = '/proxy/{path}',
  PostUpload = '/upload/{provider}/{profile}/postUpload',
  PreUpload = '/upload/{provider}/{profile}/preUpload'
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
export enum OperationField {
  OperationType = 'operationType',
  Path = 'path',
  ResponseSchema = 'responseSchema',
  VariablesSchema = 'variablesSchema'
}

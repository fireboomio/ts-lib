export interface ApiAuthenticationConfig {
  cookieBased?: CookieBasedAuthentication
  hooks?: ApiAuthenticationHooks
  jwksBased?: JwksBasedAuthentication
  publicClaims?: string[]
}

export interface JwksBasedAuthentication {
  providers?: JwksAuthProvider[]
}

export interface JwksAuthProvider {
  jwksUrl?: ConfigurationVariable
  jwksJson?: ConfigurationVariable
  userInfoEndpoint?: ConfigurationVariable
  userInfoCacheTtlSeconds?: number
}

export interface ApiAuthenticationHooks {
  postAuthentication?: boolean
  mutatingPostAuthentication?: boolean
  revalidateAuthentication?: boolean
  postLogout?: boolean
  tsPathMap?: { [key: string]: string }
}

export interface CookieBasedAuthentication {
  providers?: AuthProvider[]
  authorizedRedirectUris?: ConfigurationVariable[]
  authorizedRedirectUriRegexes?: ConfigurationVariable[]
  hashKey?: ConfigurationVariable
  blockKey?: ConfigurationVariable
  csrfSecret?: ConfigurationVariable
}

export interface AuthProvider {
  id?: string
  kind?: AuthProviderKind
  githubConfig?: GithubAuthProviderConfig
  oidcConfig?: OpenIDConnectAuthProviderConfig
}

export enum AuthProviderKind {
  AuthProviderGithub = 0,
  AuthProviderOIDC = 1,
  AuthProviderAuth0 = 2
}

export interface GithubAuthProviderConfig {
  clientId?: ConfigurationVariable
  clientSecret?: ConfigurationVariable
}

export interface OpenIDConnectQueryParameter {
  name?: ConfigurationVariable
  value?: ConfigurationVariable
}

export interface OpenIDConnectAuthProviderConfig {
  issuer?: ConfigurationVariable
  clientId?: ConfigurationVariable
  clientSecret?: ConfigurationVariable
  queryParameters?: OpenIDConnectQueryParameter[]
}

export interface ApiCacheConfig {
  kind?: ApiCacheKind
  inMemoryConfig?: InMemoryCacheConfig
  redisConfig?: RedisCacheConfig
}

export enum ApiCacheKind {
  NO_CACHE = 0,
  IN_MEMORY_CACHE = 1,
  REDIS_CACHE = 2
}

export interface InMemoryCacheConfig {
  maxSize?: number
}

export interface RedisCacheConfig {
  redisUrlEnvVar?: string
}

export interface Operation {
  name?: string
  path?: string
  content?: string
  originContent?: string
  operationType?: OperationType
  engine?: OperationExecutionEngine
  internal?: boolean
  responseSchema?: string
  variablesSchema?: string
  interpolationVariablesSchema?: string
  cacheConfig?: OperationCacheConfig
  authenticationConfig?: OperationAuthenticationConfig
  liveQueryConfig?: OperationLiveQueryConfig
  authorizationConfig?: OperationAuthorizationConfig
  hooksConfiguration?: OperationHooksConfiguration
  variablesConfiguration?: OperationVariablesConfiguration
  postResolveTransformations?: PostResolveTransformation[]
  datasourceQuotes?: string[]
  enableTransaction?: boolean
  internalVariablesSchema?: string
  injectedVariablesSchema?: string
}

export enum OperationExecutionEngine {
  ENGINE_GRAPHQL = 0,
  ENGINE_FUNCTION = 1,
  ENGINE_PROXY = 2
}

export interface PostResolveTransformation {
  kind?: PostResolveTransformationKind
  depth?: number
  get?: PostResolveGetTransformation
}

export interface PostResolveGetTransformation {
  from?: string[]
  to?: string[]
  deleteFrom?: boolean
  convertMap?: { [key: string]: string }
  dateTimeFormat?: string
}

export enum PostResolveTransformationKind {
  GET_POST_RESOLVE_TRANSFORMATION = 0
}

export interface OperationVariablesConfiguration {
  injectVariables?: VariableInjectionConfiguration[]
  keyReplaces?: PostResolveGetTransformation[]
  valReplaces?: PostResolveGetTransformation[]
}

export interface VariableInjectionConfiguration {
  variablePathComponents?: string[]
  variableKind?: InjectVariableKind
  dateFormat?: string
  environmentVariableName?: string
  fromHeaderName?: string
}

export enum InjectVariableKind {
  UUID = 0,
  DATE_TIME = 1,
  ENVIRONMENT_VARIABLE = 2,
  FROM_HEADER = 3
}

export interface GraphQLDataSourceHooksConfiguration {
  onWSTransportConnectionInit?: boolean
}

export interface OperationHooksConfiguration {
  preResolve?: boolean
  postResolve?: boolean
  mutatingPreResolve?: boolean
  mutatingPostResolve?: boolean
  customResolve?: boolean
  mockResolve?: MockResolveHookConfiguration
  httpTransportBeforeRequest?: boolean
  httpTransportOnRequest?: boolean
  httpTransportOnResponse?: boolean
  onConnectionInit?: boolean
  tsPathMap?: { [key: string]: string }
}

export interface MockResolveHookConfiguration {
  enabled?: boolean
  subscriptionPollingIntervalMillis?: number
}

export interface OperationAuthorizationConfig {
  claims?: ClaimConfig[]
  roleConfig?: OperationRoleConfig
}

export interface OperationRoleConfig {
  requireMatchAll?: string[]
  requireMatchAny?: string[]
  denyMatchAll?: string[]
  denyMatchAny?: string[]
}

export interface CustomClaim {
  name?: string
  jsonPathComponents?: string[]
  type?: ValueType
  required?: boolean
}

export interface ClaimConfig {
  variablePathComponents?: string[]
  claimType?: ClaimType
  custom?: CustomClaim
}

export enum ClaimType {
  ISSUER = 0,
  PROVIDER = 0,
  SUBJECT = 1,
  USERID = 1,
  NAME = 2,
  GIVEN_NAME = 3,
  FAMILY_NAME = 4,
  MIDDLE_NAME = 5,
  NICKNAME = 6,
  PREFERRED_USERNAME = 7,
  PROFILE = 8,
  PICTURE = 9,
  WEBSITE = 10,
  EMAIL = 11,
  EMAIL_VERIFIED = 12,
  GENDER = 13,
  BIRTH_DATE = 14,
  ZONE_INFO = 15,
  LOCALE = 16,
  LOCATION = 17,
  ROLES = 18,

  CUSTOM = 999
}

export enum ValueType {
  STRING = 0,
  INT = 1,
  FLOAT = 2,
  BOOLEAN = 3,
  ARRAY = 4
}

export interface OperationLiveQueryConfig {
  enabled?: boolean
  pollingIntervalSeconds?: number
}

export interface OperationAuthenticationConfig {
  authRequired?: boolean
}

export interface OperationCacheConfig {
  enabled?: boolean
  maxAge?: number
  public?: boolean
  staleWhileRevalidate?: number
}

export enum OperationType {
  QUERY = 0,
  MUTATION = 1,
  SUBSCRIPTION = 2
}

export interface EngineConfiguration {
  defaultFlushInterval?: number
  datasourceConfigurations?: DataSourceConfiguration[]
  fieldConfigurations?: FieldConfiguration[]
  graphqlSchema?: string
  typeConfigurations?: TypeConfiguration[]
}

export interface DataSourceConfiguration {
  kind?: DataSourceKind
  rootNodes?: TypeField[]
  childNodes?: TypeField[]
  overrideFieldPathFromAlias?: boolean
  customRestMap?: { [key: string]: DataSourceCustom_REST }
  customRest?: DataSourceCustom_REST
  customGraphql?: DataSourceCustom_GraphQL
  customStatic?: DataSourceCustom_Static
  customDatabase?: DataSourceCustom_Database
  directives?: DirectiveConfiguration[]
  requestTimeoutSeconds?: number
  id?: string
}

export interface DirectiveConfiguration {
  directiveName?: string
  renameTo?: string
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

export interface DataSourceCustom_REST {
  fetch?: FetchConfiguration
  subscription?: RESTSubscriptionConfiguration
  statusCodeTypeMappings?: StatusCodeTypeMapping[]
  defaultTypeName?: string
}

export interface StatusCodeTypeMapping {
  statusCode?: number
  typeName?: string
  injectStatusCodeIntoBody?: boolean
}

export interface DataSourceCustom_GraphQL {
  fetch?: FetchConfiguration
  subscription?: GraphQLSubscriptionConfiguration
  federation?: GraphQLFederationConfiguration
  upstreamSchema?: string
  hooksConfiguration?: GraphQLDataSourceHooksConfiguration
  customScalarTypeFields?: SingleTypeField[]
}

export interface DataSourceCustom_Database {
  databaseURL?: ConfigurationVariable
  prismaSchema?: string
  graphqlSchema?: string
  closeTimeoutSeconds?: number
  jsonTypeFields?: SingleTypeField[]
  jsonInputVariables?: string[]
}

export interface GraphQLFederationConfiguration {
  enabled?: boolean
  serviceSdl?: string
}

export interface DataSourceCustom_Static {
  data?: ConfigurationVariable
}

export interface GraphQLSubscriptionConfiguration {
  enabled?: boolean
  url?: ConfigurationVariable
  useSSE?: boolean
}

export interface FetchConfiguration {
  url?: ConfigurationVariable
  method?: HTTPMethod
  header?: { [key: string]: HTTPHeader }
  body?: ConfigurationVariable
  query?: URLQueryConfiguration[]
  upstreamAuthentication?: UpstreamAuthentication
  urlEncodeBody?: boolean
  mTLS?: MTLSConfiguration
  baseUrl?: ConfigurationVariable
  path?: ConfigurationVariable
}

export interface MTLSConfiguration {
  key?: ConfigurationVariable
  cert?: ConfigurationVariable
  insecureSkipVerify?: boolean
}

export interface UpstreamAuthentication {
  kind?: UpstreamAuthenticationKind
  jwtConfig?: JwtUpstreamAuthenticationConfig
  jwtWithAccessTokenExchangeConfig?: JwtUpstreamAuthenticationWithAccessTokenExchange
}

export enum UpstreamAuthenticationKind {
  UpstreamAuthenticationJWT = 0,
  UpstreamAuthenticationJWTWithAccessTokenExchange = 1
}

export interface JwtUpstreamAuthenticationConfig {
  secret?: ConfigurationVariable
  signingMethod?: SigningMethod
}

export interface JwtUpstreamAuthenticationWithAccessTokenExchange {
  secret?: ConfigurationVariable
  signingMethod?: SigningMethod
  accessTokenExchangeEndpoint?: ConfigurationVariable
}

export enum SigningMethod {
  SigningMethodHS256 = 0
}

export interface RESTSubscriptionConfiguration {
  enabled?: boolean
  pollingIntervalMillis?: number
  skipPublishSameResponse?: boolean
}

export interface URLQueryConfiguration {
  name?: string
  value?: string
}

export interface HTTPHeader {
  values?: ConfigurationVariable[]
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

export interface TypeConfiguration {
  typeName?: string
  renameTo?: string
}

export interface FieldConfiguration {
  typeName?: string
  fieldName?: string
  disableDefaultFieldMapping?: boolean
  path?: string[]
  argumentsConfiguration?: ArgumentConfiguration[]
  requiresFields?: string[]
  unescapeResponseJson?: boolean
}

export interface TypeField {
  typeName?: string
  fieldNames?: string[]
  quotes?: { [key: number]: QuoteField }
}

export interface QuoteField {
  indexes?: number[]
}

export interface SingleTypeField {
  typeName?: string
  fieldName?: string
}

export enum ArgumentSource {
  OBJECT_FIELD = 0,
  FIELD_ARGUMENT = 1
}

export interface ArgumentConfiguration {
  name?: string
  sourceType?: ArgumentSource
  sourcePath?: string[]
  renderConfiguration?: ArgumentRenderConfiguration
  renameTypeTo?: string
}

export enum ArgumentRenderConfiguration {
  RENDER_ARGUMENT_DEFAULT = 0,
  RENDER_ARGUMENT_AS_GRAPHQL_VALUE = 1,
  RENDER_ARGUMENT_AS_ARRAY_CSV = 2,
  RENDER_ARGUMENT_AS_JSON_VALUE = 3
}

export interface FireboomConfiguration {
  api?: UserDefinedApi
  apiId?: string
  environmentIds?: string[]
  dangerouslyEnableGraphQLEndpoint?: boolean
  deploymentName?: string
  apiName?: string
}

export interface S3UploadProfileHooksConfiguration {
  preUpload?: boolean
  postUpload?: boolean
}

export interface S3UploadProfile {
  requireAuthentication?: boolean
  maxAllowedUploadSizeBytes?: number
  maxAllowedFiles?: number
  allowedMimeTypes?: string[]
  allowedFileExtensions?: string[]
  metadataJSONSchema?: string
  hooks?: S3UploadProfileHooksConfiguration
}

export interface S3UploadConfiguration {
  name?: string
  endpoint?: ConfigurationVariable
  accessKeyID?: ConfigurationVariable
  secretAccessKey?: ConfigurationVariable
  bucketName?: ConfigurationVariable
  bucketLocation?: ConfigurationVariable
  useSSL?: boolean
  uploadProfiles?: { [key: string]: S3UploadProfile }
}

export interface UserDefinedApi {
  engineConfiguration?: EngineConfiguration
  enableGraphqlEndpoint?: boolean
  operations?: Operation[]
  corsConfiguration?: CorsConfiguration
  authenticationConfig?: ApiAuthenticationConfig
  s3UploadConfiguration?: S3UploadConfiguration[]
  allowedHostNames?: ConfigurationVariable[]
  webhooks?: WebhookConfiguration[]
  serverOptions?: ServerOptions
  nodeOptions?: NodeOptions
  invalidOperationNames?: string[]
  proxyRequests?: string[]
}

export interface ListenerOptions {
  host?: ConfigurationVariable
  port?: ConfigurationVariable
}

export interface NodeLogging {
  level?: ConfigurationVariable
}

export interface NodeOptions {
  nodeUrl?: ConfigurationVariable
  publicNodeUrl?: ConfigurationVariable
  listen?: ListenerOptions
  logger?: NodeLogging
  defaultRequestTimeoutSeconds?: number
}

export interface ServerLogging {
  level?: ConfigurationVariable
}

export interface ServerOptions {
  serverUrl?: ConfigurationVariable
  listen?: ListenerOptions
  logger?: ServerLogging
}

export interface WebhookConfiguration {
  name?: string
  filePath?: string
  verifier?: WebhookVerifier
}

export interface WebhookVerifier {
  kind?: WebhookVerifierKind
  secret?: ConfigurationVariable
  signatureHeader?: string
  signatureHeaderPrefix?: string
}

export enum WebhookVerifierKind {
  HMAC_SHA256 = 0
}

export interface CorsConfiguration {
  allowedOrigins?: ConfigurationVariable[]
  allowedMethods?: string[]
  allowedHeaders?: string[]
  exposedHeaders?: string[]
  maxAge?: number
  allowCredentials?: boolean
}

export interface ConfigurationVariable {
  kind?: ConfigurationVariableKind
  staticVariableContent?: string
  environmentVariableName?: string
  environmentVariableDefaultValue?: string
  placeholderVariableName?: string
}

export enum ConfigurationVariableKind {
  STATIC_CONFIGURATION_VARIABLE = 0,
  ENV_CONFIGURATION_VARIABLE = 1,
  PLACEHOLDER_CONFIGURATION_VARIABLE = 2
}

export const resolveConfigurationVariable = (
  variable: ConfigurationVariable
): string | undefined => {
  switch (variable.kind) {
    case ConfigurationVariableKind.STATIC_CONFIGURATION_VARIABLE:
      return variable.staticVariableContent
    case ConfigurationVariableKind.ENV_CONFIGURATION_VARIABLE:
      return (
        process.env[variable.environmentVariableName as string] ||
        variable.environmentVariableDefaultValue
      )
    case ConfigurationVariableKind.PLACEHOLDER_CONFIGURATION_VARIABLE:
      throw `Placeholder ${variable.placeholderVariableName} should be replaced with a real value`
  }
  return undefined
}

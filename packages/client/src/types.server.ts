export type User_customClaims = Record<string, any>

export type User = {
  accessToken?: any
  birthDate?: string
  customAttributes?: string[]
  customClaims?: User_customClaims
  email?: string
  emailVerified?: boolean
  etag?: string
  firstName?: string
  fromCookie?: boolean
  gender?: string
  idToken?: any
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

export type S3UploadProfile = {
  allowedFileExtensions: string[]
  allowedMimeTypes: string[]
  hooks: S3UploadProfileHooksConfiguration
  maxAllowedFiles: number
  maxAllowedUploadSizeBytes: number
  metadataJSONSchema: string
  requireAuthentication: boolean
}

export type S3UploadProfileHooksConfiguration = {
  postUpload: boolean
  preUpload: boolean
}

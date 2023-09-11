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

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>

export type JSONObject = { [key: string]: JSONValue }

export type SKIP = 'skip'

// use CANCEL to skip the hook and cancel the request / response chain
// this is semantically equal to throwing an error (500)
export type CANCEL = 'cancel'

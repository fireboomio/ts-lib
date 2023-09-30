const { readFileSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

const file = resolve(__dirname, '../umd/index.umd.min.js')
const content = readFileSync(file, 'utf-8')
writeFileSync(
  file + '.hbs',
  content
    .replace(`["queries"]`, `[{{#each operations}}{{#if isQuery}}"{{path}}",{{/if}}{{/each}}]`)
    .replace(`["mutations"]`, `[{{#each operations}}{{#if isMutation}}"{{path}}",{{/if}}{{/each}}]`)
    .replace(
      `["subscriptions"]`,
      `[{{#each operations}}{{#if (isAnyTrue isSubscription (isAllTrue isQuery isLiveQuery))}}"{{path}}",{{/if}}{{/each}}]`
    )
    .replace(
      `{baseURL:"http://localhost:9991"}`,
      `{baseURL:"{{baseURL}}",csrfEnabled:{{enableCSRFProtect}},requestTimeoutMs:30000,operationMetadata:{
        {{~#each operations~}}
          '{{path}}':{requiresAuthentication:{{authRequired}} },
        {{~/each~}}
      }},{
      {{~#each s3Providers~}}
      {{name}}: {useSSL:{{useSSL}},bucketName:'{{getVariableString bucketName}}',endpoint:'{{getVariableString endpoint}}'}
      {{~#unless @last}},{{/unless}}
      {{~/each}} }`
    ),
  'utf-8'
)

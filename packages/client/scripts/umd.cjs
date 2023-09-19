const { readFileSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

const file = resolve(__dirname, '../umd/index.umd.min.js')
const content = readFileSync(file, 'utf-8')
writeFileSync(
  file + '.hbs',
  content
    .replace(`["queries"]`, `[{{#each operations}}{{#if isQuery}}"{{name}}",{{/if}}{{/each}}]`)
    .replace(`["mutations"]`, `[{{#each operations}}{{#if isMutation}}"{{name}}",{{/if}}{{/each}}]`)
    .replace(
      `["subscriptions"]`,
      `[{{#each operations}}{{#if isSubscription}}"{{name}}",{{/if}}{{/each}}]`
    )
    .replace(
      `{baseURL:"http://localhost:9991"}`,
      `{baseURL:"{{baseURL}}",csrfEnabled:{{enableCSRFProtect}},requestTimeoutMs:30000,operationMetadata:{ {{#each operations}}'{{name}}':{requiresAuthentication:{{authRequired}} },{{/each}} }}`
    ),
  'utf-8'
)

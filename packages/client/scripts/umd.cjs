const { readFileSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

const file = resolve(__dirname, '../umd/index.umd.min.js')
const content = readFileSync(file, 'utf-8')
writeFileSync(
  file,
  content
    .replace(`["queries"]`, `[{{#each operations}}{{#if isQuery}}"{{name}}",{{/if}}{{/each}}]`)
    .replace(`["mutations"]`, `[{{#each operations}}{{#if isMutation}}"{{name}}",{{/if}}{{/each}}]`)
    .replace(
      `["subscriptions"]`,
      `[{{#each operations}}{{#if isSubscription}}"{{name}}",{{/if}}{{/each}}]`
    ),
  'utf-8'
)

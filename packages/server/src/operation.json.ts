import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import type { HookParent, Operation } from './types'

export async function saveOperationConfig(
  folder: HookParent,
  path: string,
  config: Partial<Operation> | string
) {
  const jsonPath = resolve(process.cwd(), folder, path + '.json')
  const outputFolder = dirname(jsonPath)
  try {
    if (!(await stat(outputFolder)).isDirectory()) {
      await mkdir(outputFolder, { recursive: true })
    }
  } catch (error) {
    await mkdir(outputFolder, { recursive: true })
  }
  let json: Partial<Operation> = {}
  try {
    const content = await readFile(jsonPath, 'utf-8')
    json = JSON.parse(content)
  } catch (error) {
    // File not exist
  }
  if (typeof config === 'string') {
    await writeFile(jsonPath, config)
  } else {
    json = { ...json, ...config }
    await writeFile(jsonPath, JSON.stringify(json, null, 2))
  }
}

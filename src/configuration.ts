import { ConfigurationVariable, ConfigurationVariableKind } from './types'

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

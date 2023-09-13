/**
 * Produces a deep copy of the given argument, used structuredClone() if available
 * @param v Value to copy
 * @returns Deep copy of v
 */
export const deepClone = <T>(v: T): T => {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(v)
    } catch {
      //
    }
  }
  return JSON.parse(JSON.stringify(v))
}

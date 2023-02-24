import { useState } from "#app"
import { useFlameConfig } from "./use-flame-config"

/**
 * Returns the current user.
 * Notice: Server and Client have different types
 *
 * TODO: Add return types
 * @param {any} initialValue
 * @returns {User|DecodedIdToken|undefined} The current user
 */
export const useCurrentUser = (initialValue: any = undefined) => {
  return useState(useFlameConfig().authStateKey, () => initialValue)
}

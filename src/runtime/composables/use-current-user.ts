import { useState } from "#app"

/**
 * Returns the current user.
 * Notice: Server and Client have different types
 *
 * TODO: Add types for server and client
 *
 * @returns {User|DecodedIdToken|undefined} The current user
 */
export const useCurrentUser = () => {
  return useState("firebaseCurrentUser")
}

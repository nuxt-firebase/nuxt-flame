import { useNuxtApp } from "#app"
import { Auth } from "@firebase/auth"

/**
 * Returns the Firebase Auth instance (client only)
 *
 * @returns {Auth} Firebase Auth instance
 */
export const useAuth = (): Auth | null => {
  if (!process.client) return null

  return useNuxtApp().$firebaseAuth
}

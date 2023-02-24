import { getAuth, Auth } from "@firebase/auth"
import { useNuxtApp } from "#app"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firebase Auth instance (client only)
 *
 * @returns {Auth} Firebase Auth instance
 */
export const useAuth = (): Auth | null => {
  if (!process.client) return null

  const nuxtApp = useNuxtApp()

  if (nuxtApp.$flameAuth) return nuxtApp.$flameAuth as Auth

  const app = useFirebaseApp()!
  const auth = getAuth(app)

  nuxtApp.provide("flameAuth", auth)

  return auth
}

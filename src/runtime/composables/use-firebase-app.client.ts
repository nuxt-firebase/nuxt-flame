import { initializeApp, FirebaseApp } from "firebase/app"
import { useRuntimeConfig } from "#imports"

/**
 * Returns the Firebase App instance (client only)
 *
 * @returns {FirebaseApp} Firebase App instance
 * @throws {Error} Missing firebase credentials in runtime config
 */
export const useFirebaseApp = (): FirebaseApp | null => {
  if (!process.client) return null

  const { firebaseCredentials } = useRuntimeConfig().public || {}

  if (!firebaseCredentials) {
    throw new Error("Missing firebase credentials in runtime config")
  }

  return initializeApp(firebaseCredentials)
}
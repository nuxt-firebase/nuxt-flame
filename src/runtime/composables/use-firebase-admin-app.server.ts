import { initializeApp, getApps, cert, App } from "firebase-admin/app"
import { useRuntimeConfig } from "#imports"

let firebaseAdminApp: App | null = null

/**
 * Returns the Firebase Admin App instance (server only)
 *
 * @returns {App} Firebase Admin App instance
 */
export const useFirebaseAdminApp = (): App => {
  if (firebaseAdminApp) return firebaseAdminApp

  const apps = getApps()

  if (apps.length) {
    firebaseAdminApp = apps[0]
    return firebaseAdminApp
  }

  const { firebaseAdminCredentials } = useRuntimeConfig()

  if (!firebaseAdminCredentials) {
    throw new Error("Missing firebase admin credentials in runtime config")
  }

  firebaseAdminApp = initializeApp({
    credential: cert(firebaseAdminCredentials),
  })

  return firebaseAdminApp
}
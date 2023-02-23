import { initializeApp, getApps, cert, App } from "firebase-admin/app"
import { useRuntimeConfig } from "#imports"

export const useFirebaseAdminApp = (): App | null => {
  if (!process.server) return null

  const apps = getApps()

  if (apps.length) {
    return apps[0]
  }

  const { firebaseAdminCredentials } = useRuntimeConfig()

  if (!firebaseAdminCredentials) {
    throw new Error("Missing firebase admin credentials in runtime config")
  }

  return initializeApp({ credential: cert(firebaseAdminCredentials) })
}
import { getAuth, Auth } from "firebase-admin/auth"
import { useFirebaseAdminApp } from "./use-firebase-admin-app.server"

/**
 * Returns the Firebase Auth instance (server only)
 *
 * @returns {Auth} Firebase Auth instance
 */
export const useServerAuth = (): Auth | null => {
  if (!process.server) return null

  const app = useFirebaseAdminApp()!

  return getAuth(app)
}

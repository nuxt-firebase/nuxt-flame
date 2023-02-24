import { getAuth, Auth } from "firebase-admin/auth"
import { useFirebaseAdminApp } from "./use-firebase-admin-app.server"

let firebaseServerAuth: Auth | null = null

/**
 * Returns the Firebase Auth instance (server only)
 *
 * @returns {Auth} Firebase Auth instance
 */
export const useServerAuth = (): Auth => {
  if (firebaseServerAuth) return firebaseServerAuth

  const app = useFirebaseAdminApp()!
  firebaseServerAuth = getAuth(app)

  return firebaseServerAuth
}

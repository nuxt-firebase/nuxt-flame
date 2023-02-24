import { getAuth, Auth } from "@firebase/auth"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firebase Auth instance (client only)
 *
 * @returns {Auth} Firebase Auth instance
 */
export const useAuth = (): Auth | null => {
  if (!process.client) return null

  const app = useFirebaseApp()!

  return getAuth(app)
}

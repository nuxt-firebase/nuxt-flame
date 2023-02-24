import { getDatabase } from "@firebase/database"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Realtime Database instance
 *
 * @returns {Database} Realtime Database instance
 */
export const useDatabase = () => {
  const app = useFirebaseApp()!
  const database = getDatabase(app)

  enableEmulator({ name: "database", module: database })

  return database
}

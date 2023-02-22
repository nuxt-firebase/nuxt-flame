import { useNuxtApp } from "#app"
import { getDatabase } from "@firebase/database"
import { enableEmulator } from "../utils/emulators"

/**
 * Returns the Realtime Database instance
 *
 * @returns {Database} Realtime Database instance
 */
export const useDatabase = () => {
  const firebaseApp = useNuxtApp().$firebaseApp

  const database = getDatabase(firebaseApp)
  enableEmulator({ name: "database", module: database })

  return database
}

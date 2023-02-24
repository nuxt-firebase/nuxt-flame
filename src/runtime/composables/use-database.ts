import { getDatabase, Database } from "@firebase/database"
import { useNuxtApp } from "#app"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Realtime Database instance
 *
 * @returns {Database} Realtime Database instance
 */
export const useDatabase = (): Database => {
  const nuxtApp = useNuxtApp()

  if (nuxtApp.$flameDatabase) return nuxtApp.$flameDatabase as Database

  const app = useFirebaseApp()!
  const database = getDatabase(app)

  enableEmulator({ name: "database", module: database })
  nuxtApp.provide("flameDatabase", database)

  return database
}

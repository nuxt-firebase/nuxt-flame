import { useNuxtApp } from "#app"
import { getDatabase } from "@firebase/database"
import { enableEmulator } from "../utils/emulators"

export const useDatabase = () => {
  const firebaseApp = useNuxtApp().$firebaseApp

  const database = getDatabase(firebaseApp)
  enableEmulator({ name: "database", module: database })

  return database
}

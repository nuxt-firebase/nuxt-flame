import { useNuxtApp } from "#app"
import { getStorage } from "@firebase/storage"
import { enableEmulator } from "../utils/emulators"

/**
 * Returns the Firebase Cloud Storage instance
 *
 * @returns {Storage} Firebase Cloud Storage instance
 */
export const useStorage = () => {
  const firebaseApp = useNuxtApp().$firebaseApp

  const storage = getStorage(firebaseApp)
  enableEmulator({ name: "storage", module: storage })

  return storage
}

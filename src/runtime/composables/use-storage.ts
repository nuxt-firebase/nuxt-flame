import { getStorage, FirebaseStorage } from "@firebase/storage"
import { useNuxtApp } from "#app"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firebase Cloud Storage instance
 *
 * @returns {FirebaseStorage} Firebase Cloud Storage instance
 */
export const useStorage = (): FirebaseStorage => {
  const nuxtApp = useNuxtApp()

  if (nuxtApp.$flameStorage) return nuxtApp.$flameStorage as FirebaseStorage

  const app = useFirebaseApp()!
  const storage = getStorage(app)

  enableEmulator({ name: "storage", module: storage })
  nuxtApp.provide("flameStorage", storage)

  return storage
}

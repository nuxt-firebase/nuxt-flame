import { getStorage } from "@firebase/storage"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firebase Cloud Storage instance
 *
 * @returns {Storage} Firebase Cloud Storage instance
 */
export const useStorage = () => {
  const app = useFirebaseApp()!
  const storage = getStorage(app)

  enableEmulator({ name: "storage", module: storage })

  return storage
}

import { getFirestore } from "@firebase/firestore"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firestore instance
 *
 * @returns {Firestore} Firestore instance
 */
export const useFirestore = () => {
  const app = useFirebaseApp()!
  const firestore = getFirestore(app)

  enableEmulator({ name: "firestore", module: firestore })

  return firestore
}

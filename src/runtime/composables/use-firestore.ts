import { useNuxtApp } from "#app"
import { getFirestore } from "@firebase/firestore"
import { enableEmulator } from "../utils/emulators"

/**
 * Returns the Firestore instance
 *
 * @returns {Firestore} Firestore instance
 */
export const useFirestore = () => {
  const firebaseApp = useNuxtApp().$firebaseApp

  const firestore = getFirestore(firebaseApp)
  enableEmulator({ name: "firestore", module: firestore })

  return firestore
}

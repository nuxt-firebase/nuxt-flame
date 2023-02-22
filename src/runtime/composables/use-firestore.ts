import { useNuxtApp } from "#app"
import { getFirestore } from "@firebase/firestore"
import { enableEmulator } from "../utils/emulators"

export const useFirestore = () => {
  const firebaseApp = useNuxtApp().$firebaseApp

  const firestore = getFirestore(firebaseApp)
  enableEmulator({ name: "firestore", module: firestore })

  return firestore
}

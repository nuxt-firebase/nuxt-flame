import { getFirestore, Firestore } from "@firebase/firestore"
import { useNuxtApp } from "#app"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firestore instance
 *
 * @returns {Firestore} Firestore instance
 */
export const useFirestore = (): Firestore => {
  const nuxtApp = useNuxtApp()

  if (nuxtApp.$flameFirestore) return nuxtApp.$flameFirestore as Firestore

  const app = useFirebaseApp()!
  const firestore = getFirestore(app)

  enableEmulator({ name: "firestore", module: firestore })
  nuxtApp.provide("flameFirestore", firestore)

  return firestore
}

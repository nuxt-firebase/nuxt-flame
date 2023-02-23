import { useNuxtApp } from "#app"
import { FirebaseApp } from "firebase/app"

export const useFirebaseApp = (): FirebaseApp | null => {
  if (!process.client) return null

  return useNuxtApp().$firebaseApp
}
import { initializeApp, FirebaseApp } from "firebase/app"
import { useNuxtApp, useRuntimeConfig } from "#imports"

/**
 * Returns the Firebase App instance (client only)
 *
 * @returns {FirebaseApp} Firebase App instance
 */
export const useFirebaseApp = (): FirebaseApp => {
  const nuxtApp = useNuxtApp()

  if (nuxtApp.$flameApp) return nuxtApp.$flameApp as FirebaseApp

  const { firebaseCredentials } = useRuntimeConfig().public || {}

  if (!firebaseCredentials) {
    throw new Error("Missing firebase credentials in runtime config")
  }

  const app = initializeApp(firebaseCredentials)
  nuxtApp.provide("flameApp", app)

  return app
}
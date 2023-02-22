import { defineNuxtPlugin, useRuntimeConfig } from "#app"
import { initializeApp } from "firebase/app"
import { getAuth } from "@firebase/auth"
import { enableAuthEmulator } from "./utils/emulators"
import { saveSession } from "./utils/session"
import { useCurrentUser } from "#imports"

/**
 * Plugin to initialize Firebase App and Auth on client side
 */
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const { firebaseCredentials } = runtimeConfig.public || {}

  if (!firebaseCredentials) {
    throw new Error("Missing firebase credentials in runtime config")
  }

  // Initialize Firebase App and Auth
  const firebaseApp = initializeApp(firebaseCredentials)
  const firebaseAuth = getAuth(firebaseApp)
  enableAuthEmulator(firebaseAuth)

  const currentUser = useCurrentUser()

  // Listen to auth state changes and save the session
  firebaseAuth.onIdTokenChanged(async (user) => {
    await saveSession(user)
    currentUser.value = user
  })

  // Return the Firebase App and Auth to be injected in the Nuxt App context
  return {
    provide: {
      firebaseApp,
      firebaseAuth,
    },
  }
})

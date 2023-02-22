import { defineNuxtPlugin, useRuntimeConfig } from "#app"
import { initializeApp } from "firebase/app"
import { getAuth } from "@firebase/auth"
import { enableAuthEmulator } from "./utils/emulators"
import { saveSession } from "./utils/session"
import { useCurrentUser } from "#imports"

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const { firebaseCredentials } = runtimeConfig.public || {}

  if (!firebaseCredentials) {
    throw new Error("Missing firebase credentials in runtime config")
  }

  const firebaseApp = initializeApp(firebaseCredentials)
  const firebaseAuth = getAuth(firebaseApp)
  enableAuthEmulator(firebaseAuth)

  const currentUser = useCurrentUser()

  firebaseAuth.onIdTokenChanged(async (user) => {
    await saveSession(user)
    currentUser.value = user
  })

  return {
    provide: {
      firebaseApp,
      firebaseAuth,
    },
  }
})

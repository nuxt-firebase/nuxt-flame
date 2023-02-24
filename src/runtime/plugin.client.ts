import { defineNuxtPlugin } from "#app"
import { enableAuthEmulator } from "./utils/emulators"
import { saveSession } from "./utils/session"
import { useCurrentUser, useAuth } from "#imports"

/**
 * Plugin to initialize Firebase App and Auth on client side
 */
export default defineNuxtPlugin(() => {
  const auth = useAuth()!
  enableAuthEmulator(auth)

  const currentUser = useCurrentUser()

  // Listen to auth state changes and save the session
  auth.onIdTokenChanged(async (user) => {
    await saveSession(user)
    currentUser.value = user
  })
})

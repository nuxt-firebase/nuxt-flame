import { defineNuxtPlugin, useCookie } from "#app"
import { useFlameConfig } from "./composables/use-flame-config"
import { enableAdminEmulators } from "./utils/emulators"
import { useServerAuth } from "./composables/use-server-auth.server"
import { useCurrentUser } from "./composables/use-current-user"

/**
 * Plugin to initialize Firebase Admin App and Auth on server side
 */
export default defineNuxtPlugin(async () => {
  const token = useCookie(useFlameConfig().authCookieName)

  if (!token.value) return

  // Enable emulators if enabled in config
  enableAdminEmulators()

  // Initialize Firebase Admin App and Auth
  const auth = useServerAuth()!

  try {
    // Verify the session token and set the current user
    const currentUser = useCurrentUser()
    currentUser.value = await auth.verifyIdToken(token.value)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Nuxt Flame] Can’t verify session:", err)
  }
})

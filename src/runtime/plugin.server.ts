import { defineNuxtPlugin, useRuntimeConfig, useCookie } from "#app"
import { getAuth } from "firebase-admin/auth"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { NuxtFlameOptionsFull } from "../module"
import { enableAdminEmulators } from "./utils/emulators"
import { useCurrentUser } from "#imports"

export default defineNuxtPlugin(async () => {
  const flameConfig = useRuntimeConfig().public.flame as NuxtFlameOptionsFull
  const token = useCookie(flameConfig.authCookieName)

  if (!token.value) return

  const { firebaseAdminCredentials } = useRuntimeConfig()

  if (!firebaseAdminCredentials) {
    throw new Error("Missing firebase admin credentials in runtime config")
  }

  enableAdminEmulators()

  const app = getApps()[0] || initializeApp({ credential: cert(firebaseAdminCredentials) })
  const auth = getAuth(app)

  try {
    const currentUser = useCurrentUser()
    currentUser.value = await auth.verifyIdToken(token.value)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Can't verify session:", err)
  }
})

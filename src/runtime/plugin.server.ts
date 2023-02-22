import { defineNuxtPlugin, useRuntimeConfig, useCookie } from "#app"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { useCurrentUser } from "#imports"
import { enableAdminEmulators } from "./utils/emulators"

export default defineNuxtPlugin(async () => {
  const token = useCookie("__session")

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
    console.error(err)
  }
})

import { User } from "@firebase/auth"
import { useFlameConfig } from "../composables/use-flame-config"

/**
 * Save the session using the auth API endpoint
 *
 * @internal
 * @param user
 */
export const saveSession = async (user: User | null) => {
  try {
    if (user) {
      const token = await user.getIdToken()
      await saveSessionRequest(token)
    } else {
      await saveSessionRequest(null)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Nuxt Flame] Can’t save session:", err)
  }
}

/**
 * Perform the request to the auth API endpoint
 *
 * @internal
 * @param token
 */
const saveSessionRequest = async (token: string | null) => {
  const { authApiEndpoint } = useFlameConfig()

  await fetch(authApiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
}

import { assertMethod, readBody, setCookie, deleteCookie, defineEventHandler } from "h3"
import { useFlameConfig } from "../../composables/use-flame-config"

/**
 * Setups an API endpoint to save the session cookie
 */
export default defineEventHandler(async (event) => {
  assertMethod(event, "POST")

  const { token } = await readBody(event)
  const { authCookieName } = useFlameConfig()

  if (token && token.length > 0) {
    setCookie(event, authCookieName, token, {
      maxAge: 60 * 60 * 24 * 5 * 1_000,
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    })
  } else {
    deleteCookie(event, authCookieName, {
      maxAge: -1,
    })
  }

  return { success: true }
})

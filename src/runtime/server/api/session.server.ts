import { assertMethod, readBody, setCookie, deleteCookie, defineEventHandler } from "h3"
import { NuxtFlameOptionsFull } from "../../../module"
import { useRuntimeConfig } from "#imports"

/**
 * Setups an API endpoint to save the session cookie
 */
export default defineEventHandler(async (event) => {
  assertMethod(event, "POST")

  const { token } = await readBody(event)
  const flameConfig = useRuntimeConfig().public.flame as NuxtFlameOptionsFull

  if (token && token.length > 0) {
    setCookie(event, flameConfig.authCookieName, token, {
      maxAge: 60 * 60 * 24 * 5 * 1_000,
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    })
  } else {
    deleteCookie(event, flameConfig.authCookieName, {
      maxAge: -1,
    })
  }

  return { success: true }
})

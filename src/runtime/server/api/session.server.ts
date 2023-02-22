import { assertMethod, readBody, setCookie, deleteCookie, defineEventHandler } from "h3"

export default defineEventHandler(async (event) => {
  assertMethod(event, "POST")

  const { token } = await readBody(event)

  if (token) {
    setCookie(event, "__session", token, {
      maxAge: 60 * 60 * 24 * 5 * 1_000,
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    })
  } else {
    deleteCookie(event, "__session", {
      maxAge: -1,
    })
  }

  return { success: true }
})

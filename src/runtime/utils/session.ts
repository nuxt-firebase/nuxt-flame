import { User } from "@firebase/auth"

export const saveSession = async (user: User | null) => {
  try {
    if (user) {
      const token = await user.getIdToken()
      await saveSessionRequest(token)
    } else {
      await saveSessionRequest(null)
    }
  } catch (err) {
    console.error(err)
  }
}

const saveSessionRequest = async (token: string | null) => {
  const res = await fetch("/api/__session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })

  return res.json()
}

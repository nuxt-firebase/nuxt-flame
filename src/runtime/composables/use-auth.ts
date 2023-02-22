import { useNuxtApp } from "#app"
import { Auth } from "@firebase/auth"

export const useAuth = (): Auth | null => {
  if (!process.client) return null

  return useNuxtApp().$firebaseAuth
}

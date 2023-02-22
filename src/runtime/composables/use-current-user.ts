import { useState } from "#app"

export const useCurrentUser = () => {
  return useState("firebaseCurrentUser")
}

import { getFunctions, Functions } from "@firebase/functions"
import { useNuxtApp } from "#app"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firebase Cloud Functions instance
 *
 * @returns {Functions} Firebase Cloud Functions instance
 */
export const useFunctions = (): Functions => {
  const nuxtApp = useNuxtApp()

  if (nuxtApp.$flameFunctions) return nuxtApp.$flameFunctions as Functions

  const app = useFirebaseApp()!
  const functions = getFunctions(app)

  enableEmulator({ name: "functions", module: functions })
  nuxtApp.provide("flameFunctions", functions)

  return functions
}

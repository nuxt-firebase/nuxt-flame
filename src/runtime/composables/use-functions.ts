import { useNuxtApp } from "#app"
import { getFunctions } from "@firebase/functions"
import { enableEmulator } from "../utils/emulators"

export const useFunctions = () => {
  const firebaseApp = useNuxtApp().$firebaseApp

  const functions = getFunctions(firebaseApp)
  enableEmulator({ name: "functions", module: functions })

  return functions
}

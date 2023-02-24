import { getFunctions } from "@firebase/functions"
import { enableEmulator } from "../utils/emulators"
import { useFirebaseApp } from "./use-firebase-app.client"

/**
 * Returns the Firebase Cloud Functions instance
 *
 * @returns {Functions} Firebase Cloud Functions instance
 */
export const useFunctions = () => {
  const app = useFirebaseApp()!
  const functions = getFunctions(app)

  enableEmulator({ name: "functions", module: functions })

  return functions
}

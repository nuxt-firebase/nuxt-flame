import { connectAuthEmulator, Auth } from "@firebase/auth"
import { connectFirestoreEmulator, Firestore } from "@firebase/firestore"
import { connectDatabaseEmulator, Database } from "@firebase/database"
import { connectFunctionsEmulator, Functions } from "@firebase/functions"
import { connectStorageEmulator, FirebaseStorage } from "@firebase/storage"
import { useRuntimeConfig } from "#app"
import { NuxtFlameOptions, NuxtFlameOptionsFull } from "../../module"

type EmulatorsConfig = {
  enabled: boolean,

  auth: AuthEmulatorConfig,
  firestore: CommonEmulatorConfig,
  database: CommonEmulatorConfig,
  functions: CommonEmulatorConfig,
  storage: CommonEmulatorConfig,
}

type Emulator = {
  name: "firestore",
  module: Firestore
} | {
  name: "database",
  module: Database
} | {
  name: "functions",
  module: Functions
} | {
  name: "storage",
  module: FirebaseStorage
}

export type AuthEmulatorConfig = {
  enabled: boolean,
  url: string
  options: {
    disableWarnings: boolean;
  }
}

export type CommonEmulatorConfig = {
  enabled: boolean,
  host: string,
  port: number
}

/**
 * Enables the emulator for the given module
 *
 * @param name
 * @param module
 */
export const enableEmulator = ({ name, module }: Emulator) => {
  const flameConfig = useRuntimeConfig().public.flame as NuxtFlameOptionsFull
  const emulatorsConfig = flameConfig.emulators
  const emulatorConfig = emulatorsConfig[name]

  if (!emulatorsConfig.enabled && !emulatorConfig?.enabled) {
    return
  }

  switch (name) {
  case "firestore":
    connectFirestoreEmulator(module, emulatorConfig.host, emulatorConfig.port)
    break
  case "database":
    connectDatabaseEmulator(module, emulatorConfig.host, emulatorConfig.port)
    break
  case "functions":
    connectFunctionsEmulator(module, emulatorConfig.host, emulatorConfig.port)
    break
  case "storage":
    connectStorageEmulator(module, emulatorConfig.host, emulatorConfig.port)
    break
  default:
    throw new Error(`Unknown emulator: ${name}`)
  }
}

/**
 * Enables the emulator for the given auth module
 *
 * @param auth
 */
export const enableAuthEmulator = (auth: Auth) => {
  const flameConfig = useRuntimeConfig().public.flame as NuxtFlameOptions
  const emulatorsConfig = flameConfig.emulators as EmulatorsConfig
  const emulatorConfig = emulatorsConfig.auth as AuthEmulatorConfig

  if (!emulatorsConfig.enabled && !emulatorConfig?.enabled) {
    return
  }

  connectAuthEmulator(auth, emulatorConfig.url, emulatorConfig.options)
}

/**
 * Enables the admin emulators for all modules
 */
export const enableAdminEmulators = () => {
  if (process.client) return

  const flameConfig = useRuntimeConfig().public.flame as NuxtFlameOptions
  const emulatorsConfig = flameConfig.emulators as EmulatorsConfig

  if (emulatorsConfig.enabled || emulatorsConfig.firestore.enabled) {
    process.env.FIRESTORE_EMULATOR_HOST = `${emulatorsConfig.firestore.host}:${emulatorsConfig.firestore.port}`
  }

  if (emulatorsConfig.enabled || emulatorsConfig.auth.enabled) {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = emulatorsConfig.auth.url.replace("http://", "").replace("https://", "")
  }

  if (emulatorsConfig.enabled || emulatorsConfig.database.enabled) {
    process.env.FIREBASE_DATABASE_EMULATOR_HOST = `${emulatorsConfig.database.host}:${emulatorsConfig.database.port}`
  }

  if (emulatorsConfig.enabled || emulatorsConfig.storage.enabled) {
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = `${emulatorsConfig.storage.host}:${emulatorsConfig.storage.port}`
  }
}

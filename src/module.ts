import { defineNuxtModule, addPlugin, createResolver, addServerHandler, addImports } from "@nuxt/kit"
import { AuthEmulatorConfig, CommonEmulatorConfig } from "./runtime/utils/emulators"

/**
 * Nuxt module options
 * You can find default values below
 */
export interface NuxtFlameOptions {
  /**
   * The endpoint to use for the auth API
   */
  authApiEndpoint?: string

  /**
   * The name of the cookie to use for the auth API
   */
  authCookieName?: string

  /**
   * Emulators configuration
   */
  emulators: {
    /**
     * Enable all emulators. This will override all other emulator options.
     */
    enabled?: boolean

    /**
     * Auth emulator configuration
     */
    auth?: Partial<AuthEmulatorConfig>

    /**
     * Firestore emulator configuration
     */
    firestore?: Partial<CommonEmulatorConfig>

    /**
     * Realtime Database emulator configuration
     */
    database?: Partial<CommonEmulatorConfig>

    /**
     * Cloud Functions emulator configuration
     */
    functions?: Partial<CommonEmulatorConfig>

    /**
     * Cloud Storage emulator configuration
     */
    storage?: Partial<CommonEmulatorConfig>
  }
}

export interface NuxtFlameOptionsFull {
  authApiEndpoint: string
  authCookieName: string

  emulators: {
    enabled: boolean
    auth: AuthEmulatorConfig,
    firestore: CommonEmulatorConfig,
    database: CommonEmulatorConfig,
    functions: CommonEmulatorConfig,
    storage: CommonEmulatorConfig,
  }
}

export default defineNuxtModule<NuxtFlameOptions>({
  meta: {
    name: "nuxt-flame",
    configKey: "flame",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },

  /**
   * Default options
   */
  defaults: {
    authApiEndpoint: "/api/__session",
    authCookieName: "__session",

    emulators: {
      enabled: false,

      auth: {
        enabled: false,
        url: "http://127.0.0.1:9099",
        options: {
          disableWarnings: false,
        },
      },

      firestore: {
        enabled: false,
        host: "127.0.0.1",
        port: 8080,
      },

      database: {
        enabled: false,
        host: "127.0.0.1",
        port: 9000,
      },

      functions: {
        enabled: false,
        host: "127.0.0.1",
        port: 5001,
      },

      storage: {
        enabled: false,
        host: "127.0.0.1",
        port: 9199,
      },
    },
  },

  setup(options, nuxt) {
    // Save the options to the Nuxt runtime config
    nuxt.options.runtimeConfig.public.flame = options as NuxtFlameOptionsFull

    // Resolve the module directory
    const resolver = createResolver(import.meta.url)

    // Load client and server plugins
    addPlugin(resolver.resolve("./runtime/plugin.client"))
    addPlugin(resolver.resolve("./runtime/plugin.server"))

    // Add the auth API endpoint
    addServerHandler({
      route: options.authApiEndpoint,
      handler: resolver.resolve("./runtime/server/api/session.server"),
    })

    // Import the composable functions
    addImports([
      {
        from: resolver.resolve("./runtime/composables/use-auth"),
        name: "useAuth",
      },
      {
        from: resolver.resolve("./runtime/composables/use-firestore"),
        name: "useFirestore",
      },
      {
        from: resolver.resolve("./runtime/composables/use-database"),
        name: "useDatabase",
      },
      {
        from: resolver.resolve("./runtime/composables/use-functions"),
        name: "useFunctions",
      },
      {
        from: resolver.resolve("./runtime/composables/use-storage"),
        name: "useStorage",
      },
      {
        from: resolver.resolve("./runtime/composables/use-current-user"),
        name: "useCurrentUser",
      },
    ])
  },
})

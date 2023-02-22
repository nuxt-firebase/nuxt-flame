import { defineNuxtModule, addPlugin, createResolver, addServerHandler, addImports } from "@nuxt/kit"
import { AuthEmulatorConfig, CommonEmulatorConfig } from "./runtime/utils/emulators"

// Nuxt Flame options TypeScript interface definition
export interface NuxtFlameOptions {
  emulators: {
    enabled?: boolean

    auth?: Partial<AuthEmulatorConfig>
    firestore?: Partial<CommonEmulatorConfig>
    database?: Partial<CommonEmulatorConfig>
    functions?: Partial<CommonEmulatorConfig>
    storage?: Partial<CommonEmulatorConfig>
  }
}

export interface NuxtFlameOptionsFull {
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

  // Default configuration options of the Nuxt module
  defaults: {
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

    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve("./runtime/plugin.client"))
    addPlugin(resolver.resolve("./runtime/plugin.server"))

    addServerHandler({
      route: "/api/__session",
      handler: resolver.resolve("./runtime/server/api/session.server"),
    })

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

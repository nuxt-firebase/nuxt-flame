# Nuxt Flame

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Easily integrate Google Firebase into your Nuxt 3 application.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏗️ &nbsp;Installation](#installation)
- [⚙️ &nbsp;Usage](#usage)
- [🦾 &nbsp;Advanced Usage](#advanced-usage)

## Features

- ⛰ &nbsp;Firebase Auth, Realtime Database, Firestore, Cloud Functions and Cloud Storage
- 🏎️ &nbsp;Full emulators support
- 🔋 &nbsp;SSR Friendly
- 🔐 &nbsp;Safe
- 🪶 &nbsp;Extremely light

## Installation

1. Add `nuxt-flame` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-flame firebase firebase-admin

# Using yarn
yarn add --dev nuxt-flame firebase firebase-admin

# Using npm
npm install --save-dev nuxt-flame firebase firebase-admin
```

2. Add `nuxt-flame` to the `modules` section of `nuxt.config.ts` and specify Firebase credentials in `runtimeConfig`

```js
export default defineNuxtConfig({
  modules: [
    "nuxt-flame"
  ],

  runtimeConfig: {
    firebaseAdminCredentials: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    },

    public: {
      firebaseCredentials: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },
})
```

3. _(Optional)_ Feel free to configure Nuxt Flame in `nuxt.config.ts`

```js
export default defineNuxtConfig({
  // ...

  /**
   * Default Nuxt Flame settings
   */
  flame: {
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

  // ...
})
```

That's it! You can now use Nuxt Flame in your Nuxt app ✨

## Usage

Nuxt Flame exports bunch of Firebase helpers (Vue composables) that available both client and server side.


Get Firebase App **(client-side only)**:
```js
const app = useFirebaseApp()
```

Get Firebase Admin App **(server-side only)**:
```js
const admin = useFirebaseAdminApp()
```

Get Firebase Auth instance **(client-side only)**:
```js
const auth = useAuth()
```

Get Firebase Auth instance **(server-side only)**:
```js
const auth = useServerAuth()
```

Get current user. **Important:** Client returns `User` object when server returns `DecodedIdToken` object:
```js
const currentUser = useCurrentUser()
```

Get Firebase Realtime Database instance:
```js
const db = useDatabase()
```

Get Firebase Firestore instance:
```js
const db = useFirestore()
```

Get Firebaes Cloud Functions instance:
```js
const functions = useFunctions()
```

Get Firebaes Cloud Storage instance:
```js
const storage = useStorage()
```

## Advanced Usage

TBD

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-flame/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-flame

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-flame.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-flame

[license-src]: https://img.shields.io/npm/l/nuxt-flame.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-flame

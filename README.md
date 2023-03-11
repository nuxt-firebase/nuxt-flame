![Nuxt Flame logo](https://raw.githubusercontent.com/nuxt-firebase/nuxt-flame/main/playground/assets/nuxt-flame.png)

# 🔥 Nuxt Flame

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Easily integrate Google Firebase into your Nuxt 3 application

## 🦾 Features

- ⛰ &nbsp;Firebase Auth, Firestore, Realtime Database, Cloud Functions and Cloud Storage
- 🧪 &nbsp;Emulators support
- <img src="https://raw.githubusercontent.com/nuxt-firebase/nuxt-flame/main/playground/assets/typescript.svg" width="19" alt="TypeScript Logo" /> &nbsp;TypeScript support
- 🔋 &nbsp;SSR Friendly
- 🔐 &nbsp;Safe
- 🪶 &nbsp;Light

---

- [🏗️ &nbsp;Installation](#installation)
- [⚙️ &nbsp;Usage](#usage)
  - [Apps](#firebase-apps)
  - [Auth](#firebase-auth)
  - [Firestore](#firestore)
    - [Documents](#documents)
    - [Collections](#collections)
    - [Collection Queries](#collection-queries)
  - [Cloud Functions](#cloud-functions)
  - [Realtime Database](#realtime-database)
  - [Cloud Storage](#cloud-storage)
  - [Enable Emulators](#enable-emulators)
- [🛣️ &nbsp;Roadmap](#roadmap)

## 🏗️ Installation

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
```ts
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

3. Create `.env` file and put your credentials there
```ts
// Web credentials from code snippet provided by Google Firebase
FIREBASE_API_KEY=********
FIREBASE_AUTH_DOMAIN=********
FIREBASE_PROJECT_ID=********
FIREBASE_STORAGE_BUCKET=********
FIREBASE_MESSAGING_SENDER_ID=********
FIREBASE_APP_ID=********
FIREBASE_MEASUREMENT_ID=********

// Admin credentials from service account key (JSON)
FIREBASE_CLIENT_EMAIL=********
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
****************************************************
****************************************************
****************************************************
****************************************************
****************************************************
****************************************************
**************************
-----END PRIVATE KEY-----"
```

4. **(Optional)** Feel free to configure Nuxt Flame in `nuxt.config.ts`
```ts
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


### Firebase Apps
```ts
const app = useFirebaseApp()        // client-side
const admin = useFirebaseAdminApp() // server-side
```

### Firebase Auth

Basic usage:
```ts
// Firebase Auth instance (client only)
const auth = useAuth()

// Firebase Auth instance with admin credentials (server only)
const auth = useServerAuth()

// Get current user
// ❗️ Client returns `User` object when server returns `DecodedIdToken` object
const currentUser = useCurrentUser()
```

Authentication example using Google provider:
```ts
import { GoogleAuthProvider, signInWithPopup, signOut } from "@firebase/auth"
import { useAuth, useCurrentUser } from "#imports"

const auth = useAuth()
const currentUser = useCurrentUser()

const login = async () => {
  if (!auth) return

  await signInWithPopup(auth, new GoogleAuthProvider())
}

const logout = async () => {
  if (!auth) return

  await signOut(auth)
}
```

### Firestore

Get Firebase Firestore instance:
```ts
const db = useFirestore()
```

#### Documents
```ts
// Get single document (SSR friendly)
const post = await useAsyncDocument("posts", "1")

// Get single document (async)
const { data, loading, error, refresh } = useDocument("posts", "1")

// Subscribe to document changes
const { data, loading, error, unsubscribe } = useDocumentSubscribe("posts", "1")

// Don't forget to unsubsribe
onUnmounted(() => unsubscribe())
```

#### Collections
```ts
// Get collection documents (SSR friendly)
const posts = await useAsyncCollection("posts")

// Get collection documents (async)
const { data, loading, error, refresh } = useCollection("posts")

// Subscribe to collection changes
const { data, loading, error, unsubscribe } = useCollectionSubscribe("posts")

// Don't forget to unsubsribe
onUnmounted(() => unsubscribe())
```

#### Collection Queries
```ts
import { where, orderBy } from "firebase/firestore"

// Get collection documents with query (SSR friendly)
const posts = await useAsyncCollection("posts", {
  conditions: [
    where("author", "==", "Andrew Kodkod"),
    orderBy("createdAt", "desc"),
  ],
})

// Get collection documents with query (async)
const { data, loading, error, refresh } = useCollection("posts", {
  conditions: [
    where("author", "==", "Andrew Kodkod"),
    orderBy("createdAt", "desc"),
  ],
})
```

### Cloud Functions

Get Firebase Cloud Functions instance:
```ts
const functions = useFunctions()
```

Call https callable Cloud Function:
```ts
const archivePost = useFunction("archivePost")

const onArchive = async () => {
  const result = await archivePost.performAsync({ postId: "1", reason: "Spam" })
}
```

### Realtime Database

Get Firebase Realtime Database instance:
```ts
const db = useDatabase()
```

### Cloud Storage

Get Firebase Cloud Storage instance:
```ts
const storage = useStorage()
```

### Enable Emulators
```ts
// nuxt.config.ts

export default defineNuxtConfig({
  // ...

  flame: {
    emulators: {
      enabled: process.env.NODE_ENV !== "production",
    }
  }

  // ...
})
```

## 🛣️ Roadmap

- [ ] Tests
- [ ] TypeScript examples
- [ ] Advanced usage examples
- [x] Helpers for Firestore
- [x] Helpers for Functions
- [ ] Helpers for Storage
- [ ] Helpers for Realtime Database

## 👩‍💻 Development

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

[npm-version-src]: https://img.shields.io/npm/v/nuxt-flame/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-flame

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-flame.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-flame

[license-src]: https://img.shields.io/npm/l/nuxt-flame.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-flame

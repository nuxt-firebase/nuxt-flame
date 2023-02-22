import * as process from "process"

export default defineNuxtConfig({
  modules: ["../src/module"],

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

  flame: {
    emulators: {
      enabled: true,

      firestore: {
        enabled: true,
        host: "localhost",
        port: 8080,
      },
    },
  },
})

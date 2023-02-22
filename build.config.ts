import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  externals: [
    "firebase/app",
    "firebase-admin/app",
    "firebase-admin/auth",
    "@firebase/auth",
    "@firebase/database",
    "@firebase/firestore",
    "@firebase/functions",
    "@firebase/storage",
  ],
})

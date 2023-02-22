<template>
  <div class="wrapper">
    <div>
      <p>{{ currentUser?.name || currentUser?.displayName }}</p>

      <button @click.prevent="signIn">
        Sign In
      </button>

      <button @click.prevent="signOut">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup, signOut as signOutFirebase } from "@firebase/auth"
import { useAuth, useCurrentUser } from "#imports"

const auth = useAuth()
const currentUser = useCurrentUser()

const signIn = async () => {
  if (!auth) return

  await signInWithPopup(auth, new GoogleAuthProvider())
}

const signOut = async () => {
  if (!auth) return

  await signOutFirebase(auth)
}
</script>

<style scoped>
.wrapper {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  text-align: center;
}
</style>

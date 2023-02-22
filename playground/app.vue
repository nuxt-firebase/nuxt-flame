<template>
  <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-items: center; justify-content: center;">
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

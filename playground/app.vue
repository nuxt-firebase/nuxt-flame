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
import { useAuth, useCurrentUser } from "#imports"
import { GoogleAuthProvider, signInWithPopup, signOut as signOutFirebase } from "@firebase/auth"

const auth = useAuth()
const currentUser = useCurrentUser()

const signIn = async () => {
  if (!auth) return

  const result = await signInWithPopup(auth, new GoogleAuthProvider())
  console.log(result)
}

const signOut = async () => {
  if (!auth) return

  signOutFirebase(auth)
}
</script>

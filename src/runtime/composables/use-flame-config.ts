import { NuxtFlameOptionsFull } from "./../../module"
import { useRuntimeConfig } from "#imports"

/**
 * Returns the Nuxt Flame configuration
 *
 * @returns {NuxtFlameOptionsFull}
 */
export const useFlameConfig = (): NuxtFlameOptionsFull => {
  return useRuntimeConfig().public.flame as NuxtFlameOptionsFull
}
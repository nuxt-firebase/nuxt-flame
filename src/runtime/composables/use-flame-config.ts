import { NuxtFlameOptionsFull } from "./../../module"
import { useRuntimeConfig } from "#imports"

export const useFlameConfig = (): NuxtFlameOptionsFull => {
  return useRuntimeConfig().public.flame as NuxtFlameOptionsFull
}
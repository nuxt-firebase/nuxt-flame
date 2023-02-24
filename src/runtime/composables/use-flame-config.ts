import { NuxtFlameOptionsFull } from "./../../module"
import { useRuntimeConfig } from "#imports"

export const useFlameConfig = () => {
  return useRuntimeConfig().public.flame as NuxtFlameOptionsFull
}
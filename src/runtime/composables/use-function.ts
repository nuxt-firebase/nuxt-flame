import { httpsCallable, HttpsCallableOptions, HttpsCallableResult } from "@firebase/functions"
import { useFunctions } from "./use-functions"

export type UseFunctionOptions = HttpsCallableOptions

export type UseFunctionReturn<TData = any, TResponse = any> = {
  performAsync: (data: TData) => Promise<HttpsCallableResult<TResponse>>
}

/**
 * A composable that returns a function that can be used to call a Cloud Function.
 *
 * @param functionName The name of the Cloud Function to call.
 * @param options The options to pass to the Cloud Function.
 *
 * @returns {UseFunctionReturn}
 */
export function useFunction<TData = any, TResponse = any>(
  functionName: string,
  options: UseFunctionOptions = {},
): UseFunctionReturn<TData, TResponse> {
  const functions = useFunctions()
  const fn = httpsCallable<TData, TResponse>(functions, functionName, options)

  return {
    performAsync: (data: TData) => fn(data),
  }
}
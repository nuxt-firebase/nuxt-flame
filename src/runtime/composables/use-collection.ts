import { DocumentData } from "firebase/firestore"
import { Ref, ref } from "vue"
import { useAsyncCollection, UseAsyncCollectionOptions } from "./use-async-collection"

export type UseCollectionOptions = UseAsyncCollectionOptions

export type UseCollectionReturn<TData = DocumentData> = {
  data: Ref<TData[] | undefined>
  loading: Ref<boolean>
  error: Ref<Error | undefined>
  refresh: () => void
}

/**
 * Fetches a collection from Firestore
 *
 * @param collectionName The name of the collection to fetch
 * @param {UseCollectionOptions} options The options to pass to the collection
 *
 * @returns {UseCollectionReturn}
 */
export function useCollection<TData = DocumentData>(
  collectionName: string,
  options: UseCollectionOptions = {},
): UseCollectionReturn<TData> {
  const data = ref<TData[] | undefined>()
  const loading = ref(true)
  const error = ref<Error | undefined>()

  const load = () => {
    loading.value = true
    error.value = undefined

    useAsyncCollection<TData>(collectionName, options)
      .then((documents) => {
        data.value = documents
        loading.value = false
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`[Nuxt Flame] Error while loading collection: ${collectionName}\n\n`, err)

        error.value = err
        loading.value = false
      })
  }

  load()

  return {
    data,
    loading,
    error,
    refresh: load,
  }
}
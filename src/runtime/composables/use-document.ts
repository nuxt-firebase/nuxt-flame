import { DocumentData } from "@firebase/firestore"
import { ref, Ref } from "vue"
import { useAsyncDocument } from "./use-async-document"

export type UseDocumentReturn<TData = DocumentData> = {
  data: Ref<TData | null | undefined>
  loading: Ref<boolean>
  error: Ref<Error | undefined>
  refresh: () => void
}

/**
 * Fetches a document from Firestore
 *
 * @param collectionName The name of the collection to fetch
 * @param documentName The name of the document to fetch
 *
 * @returns {UseDocumentReturn}
 */
export function useDocument<TData = DocumentData>(
  collectionName: string,
  documentName: string,
): UseDocumentReturn<TData> {
  const data = ref<TData | null | undefined>()
  const loading = ref(true)
  const error = ref<Error | undefined>()

  const load = () => {
    loading.value = true
    error.value = undefined

    useAsyncDocument<TData>(collectionName, documentName)
      .then((document) => {
        data.value = document
        loading.value = false
      })
      .catch((err) => {
        /* eslint-disable no-console */
        console.error(`[Nuxt Flame] Error while loading document: ${collectionName}/${documentName}`)
        console.error(err)
        /* eslint-enable no-console */

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
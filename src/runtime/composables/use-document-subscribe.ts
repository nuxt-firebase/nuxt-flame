import { doc, onSnapshot, DocumentData, DocumentSnapshot, FirestoreError } from "@firebase/firestore"
import { ref, Ref } from "vue"
import { useFirestore } from "./use-firestore"

export type UseDocumentSubscribeReturn<TData = DocumentData> = {
  data: Ref<TData | null | undefined>
  loading: Ref<boolean>
  error: Ref<Error | undefined>
  unsubscribe: () => void
}

export type UseDocumentSubscribeOptions<TData = DocumentData> = {
  includeMetadataChanges?: boolean
  onSnapshot?: (data: TData) => void
  onError?: (error: FirestoreError) => void
  onCompletion?: () => void
}

/**
 * Subscribes to a document from Firestore
 *
 * @param collectionName The name of the collection to subscribe to
 * @param documentName The name of the document to subscribe to
 * @param {UseDocumentSubscribeOptions} options The options to pass to the document
 *
 * @returns {UseDocumentSubscribeReturn}
 */
export function useDocumentSubscribe<TData = DocumentData>(
  collectionName: string,
  documentName: string,
  options: UseDocumentSubscribeOptions<TData> = {},
): UseDocumentSubscribeReturn<TData> {
  const data = ref<TData | null | undefined>()
  const loading = ref(true)
  const error = ref<Error | undefined>()

  const db = useFirestore()
  const docRef = doc(db, collectionName, documentName)

  const handleSnapshot = (docSnapshot: DocumentSnapshot) => {
    const value = { id: docSnapshot.id, ...docSnapshot.data() } as TData

    if (docSnapshot.exists()) {
      data.value = value
      loading.value = false
    } else {
      data.value = null
      loading.value = false
    }

    options.onSnapshot?.(value)
  }

  const handleSnapshotError = (err: FirestoreError) => {
    // eslint-disable-next-line no-console
    console.error(`[Nuxt Flame] Error while subscribing to document: ${collectionName}/${documentName}\n\n`, err)

    error.value = err
    loading.value = false

    options.onError?.(err)
  }

  const unsubscribe = onSnapshot(
    docRef,
    { includeMetadataChanges: options.includeMetadataChanges },
    handleSnapshot,
    handleSnapshotError,
    options.onCompletion,
  )

  return {
    data,
    loading,
    error,
    unsubscribe,
  }
}
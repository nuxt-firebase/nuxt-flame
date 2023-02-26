import { collection, query, onSnapshot, DocumentData, QuerySnapshot, FirestoreError } from "firebase/firestore"
import { Ref, ref } from "vue"
import { UseAsyncCollectionOptions } from "./use-async-collection"
import { useFirestore } from "./use-firestore"

export type UseCollectionSubscribeOptions<TData = DocumentData> = {
  constraints?: UseAsyncCollectionOptions["constraints"]
  includeMetadataChanges?: boolean
  onSnapshot?: (data: TData[]) => void
  onError?: (error: FirestoreError) => void
  onCompletion?: () => void
}

export type UseCollectionSubscribeReturn<TData = DocumentData> = {
  data: Ref<TData[] | undefined>
  loading: Ref<boolean>
  error: Ref<Error | undefined>
  unsubscribe: () => void
}

/**
 * Subscribes to a collection from Firestore
 *
 * @param collectionName The name of the collection to subscribe to
 * @param {UseCollectionSubscribeOptions} options The options to pass to the collection
 *
 * @returns {UseCollectionSubscribeReturn}
 */
export function useCollectionSubscribe<TData = DocumentData>(
  collectionName: string,
  options: UseCollectionSubscribeOptions<TData> = {},
): UseCollectionSubscribeReturn<TData> {
  const data = ref<TData[] | undefined>()
  const loading = ref(true)
  const error = ref<Error | undefined>()

  const db = useFirestore()
  const constraints = options.constraints || []

  const q = query(
    collection(db, collectionName),
    ...Array.isArray(constraints) ? constraints : [constraints],
  )

  const handleSnapshot = (querySnapshot: QuerySnapshot) => {
    const value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TData[]

    data.value = value
    loading.value = false

    options.onSnapshot?.(value)
  }

  const handleSnapshotError = (err: FirestoreError) => {
    // eslint-disable-next-line no-console
    console.error(`[Nuxt Flame] Error while subscribing to collection: ${collectionName}\n\n`, err)

    error.value = err
    loading.value = false

    options.onError?.(err)
  }

  const unsubscribe = onSnapshot(
    q,
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
import { collection, query, getDocs, QueryConstraint, DocumentData } from "firebase/firestore"
import { useFirestore } from "./use-firestore"

export type UseAsyncCollectionOptions = {
  constraints?: QueryConstraint | QueryConstraint[]
}

/**
 * Asynchronously fetches a collection from Firestore
 *
 * @param collectionName The name of the collection to fetch
 * @param {UseAsyncCollectionOptions} options The options to pass to the collection
 *
 * @returns {TData[]}
 */
export async function useAsyncCollection<TData = DocumentData>(
  collectionName: string,
  options: UseAsyncCollectionOptions = {},
): Promise<TData[]> {
  const db = useFirestore()
  const constraints = options.constraints || []

  const q = query(
    collection(db, collectionName),
    ...Array.isArray(constraints) ? constraints : [constraints],
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TData[]
}
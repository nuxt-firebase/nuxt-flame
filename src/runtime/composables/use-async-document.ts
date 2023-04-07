import { doc, getDoc, DocumentData } from "@firebase/firestore"
import { useFirestore } from "./use-firestore"

/**
 * Asynchronously fetches a document from Firestore
 *
 * @param collectionName The name of the collection to fetch
 * @param documentName The name of the document to fetch
 *
 * @returns {TData | null}
 */
export async function useAsyncDocument<TData = DocumentData>(
  collectionName: string,
  documentName: string,
): Promise<TData | null> {
  const db = useFirestore()

  const docRef = doc(db, collectionName, documentName)
  const docSnapshot = await getDoc(docRef)

  if (docSnapshot.exists()) {
    return {
      id: docSnapshot.id,
      snapshot: docSnapshot,
      ...docSnapshot.data(),
    } as TData
  } else {
    return null
  }
}
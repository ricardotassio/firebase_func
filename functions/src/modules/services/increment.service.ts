import { Firestore } from '@google-cloud/firestore'

export function incrementIdService(firestore: Firestore) {
  return {
    incrementIdGenerator: async function (collection: string) {
      try {
        const collectionRef = firestore.collection("incrementId")
        const documentRef = collectionRef.doc(collection)
        const document = await documentRef.get()
        
        if (!document.exists) {
          console.log(`Document for collection "${collection}" does not exist. Creating a new document.`)
          await documentRef.set({ value: 1 })
          return 1
        }

        const incrementId = (document.data()?.value || 0) + 1
        await documentRef.update({ value: incrementId })

        console.log(`Incremented ID for collectionId "${collection}" to ${incrementId}`)
        return incrementId
      } catch (error) {
        console.error(`Error in incrementIdGenerator for collection "${collection}":`, error)
      //  throw new Error(`Failed to generate increment ID: ${error.message}`);
      }
    }
  }
}

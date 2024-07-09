import { Firestore } from '@google-cloud/firestore';

export function utils(firestore: Firestore) {
  return {
    incrementIdGenerator: async function (collectionId: string) {
      try {
        const collectionRef = firestore.collection("incrementId");
        const documentRef = collectionRef.doc(collectionId);
        const document = await documentRef.get();
        
        if (!document.exists) {
          console.log(`Document for collectionId "${collectionId}" does not exist. Creating a new document.`);
          await documentRef.set({ value: 1 });
          return 1;
        }

        const incrementId = (document.data()?.value || 0) + 1;
        await documentRef.update({ value: incrementId });

        console.log(`Incremented ID for collectionId "${collectionId}" to ${incrementId}`);
        return incrementId;
      } catch (error) {
        console.error(`Error in incrementIdGenerator for collectionId "${collectionId}":`, error);
      //  throw new Error(`Failed to generate increment ID: ${error.message}`);
      }
    }
  }
}

import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { createUserApp } from './modules/add-user.controller';
import { utils } from './modules/utils/utils'
const firestore = admin.firestore()
const { incrementIdGenerator } = utils(firestore)

exports.addRecord = functions.https.onRequest(createUserApp)
exports.onAddUserUpdateIncrementId = functions.firestore.document('users/{userId}')
  .onCreate((async (snap, context) => {
    const newValue = snap.data();
    const userId = context.params.userId
    try {
      if (newValue) {
        const incrementId = await incrementIdGenerator('users')
        console.log(`Increment ID generated: ${incrementId}`)
        await firestore.collection('users').doc(userId).update({ "icdrementId":incrementId })
      }
      
      // Optionally, you can update the new user document with the incrementId if needed
      
    } catch (error) {
      console.error('Error generating increment ID:', error)
    }

    return null
  }));
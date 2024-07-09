import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { createUserApp } from './modules/add-user.controller'
import { incrementIdService } from './modules/services/increment.service'
const firestore = admin.firestore()
const { incrementIdGenerator } = incrementIdService(firestore)

exports.addRecord = functions.https.onRequest(createUserApp)
exports.onAddUserUpdateIncrementId = functions.firestore.document('users/{userId}')
  .onCreate((async (snap, context) => {
    const newValue = snap.data()
    const userId = context.params.userId
    try {
      if (newValue) {
        const incrementId = await incrementIdGenerator('users')
        console.log(`Increment ID generated: ${incrementId}`)
        await firestore.collection('users').doc(userId).update({ "incrementId":incrementId })
      }  
    } catch (error) {
      console.error('Error generating increment ID:', error)
    }

    return null
  }));
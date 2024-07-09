import {db} from '../init'
const express =  require('express')

export const createUserApp = express()
createUserApp.use(express.json())
createUserApp.post("/", async (req:any, res:any) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).send('Name is required')
  }

  try {
    const newRecordRef = await db.collection('users').add({ name })
    res.status(201).send(`Record created with ID: ${newRecordRef.id}`)
  } catch (error) {
    res.status(500).send('Error creating record')
  }
})
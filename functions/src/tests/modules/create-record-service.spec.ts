import * as request from 'supertest'
import { createUserApp } from '../../modules/add-user.controller'
import { db } from '../../init'

jest.mock('../../init', () => {
  const firebase = require('@firebase/testing')
  const app = firebase.initializeTestApp({ projectId: 'test-project' })
  const db = app.firestore()
  return { db }
})

describe('POST /', () => {
  beforeEach(async () => {
    await db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
  })

  it('should return 400 if name is not provided', async () => {
    const response = await request(createUserApp)
      .post('/')
      .send({})

    expect(response.status).toBe(400)
    expect(response.text).toBe('Name is required')
  })

  it('should return 201 if name is provided', async () => {
    const response = await request(createUserApp)
      .post('/')
      .send({ name: 'Joao das Neves' })

    expect(response.status).toBe(201)
    expect(response.text).toMatch(/Record created with ID:/)
  })
})


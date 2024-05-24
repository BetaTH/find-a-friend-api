import request from 'supertest'
import { app } from '@/infra/app'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Thielson',
      responsiblePersonName: 'Thielson',
      about: 'Adote um amigo',
      email: 'thielson@gmail.com',
      whatsappNumber: '88888888888',
      password: '123456789',
      zipCode: '60000000',
      state: 'PI',
      city: 'Teresina',
      complement: 'Complemento',
      street: '64',
    })

    if (response.statusCode !== 201) {
      console.log(response.body)
    }

    expect(response.statusCode).toEqual(201)
  })
})

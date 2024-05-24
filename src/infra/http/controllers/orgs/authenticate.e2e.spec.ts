import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/infra/app'

describe('Authenticate a org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Thielson',
      responsiblePersonName: 'Thielson',
      about: 'Adote um amigo',
      email: 'thielson.test@gmail.com',
      whatsappNumber: '88888888888',
      password: '123456789',
      zipCode: '60000000',
      state: 'PI',
      city: 'Teresina',
      complement: 'Complemento',
      street: '64',
    })

    const response = await request(app.server).post('/orgs/session').send({
      email: 'thielson.test@gmail.com',
      password: '123456789',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})

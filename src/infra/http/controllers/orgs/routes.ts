import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { me } from './me'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/orgs/session', authenticate)
  app.post('/orgs/session/refresh', refresh)
  app.get('/orgs/me', { onRequest: [verifyJwt] }, me)
}

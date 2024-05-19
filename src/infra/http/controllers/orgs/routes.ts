import { FastifyInstance } from 'fastify'
import { hello } from './hello-word'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs', hello)
}

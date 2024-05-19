import { FastifyInstance } from 'fastify'
import { hello } from './hello-word'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', hello)
}

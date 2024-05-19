import { FastifyReply, FastifyRequest } from 'fastify'

export async function hello(req: FastifyRequest, rep: FastifyReply) {
  return rep.status(201).send('hello word')
}

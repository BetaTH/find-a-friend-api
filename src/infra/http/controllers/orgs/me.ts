import { FastifyReply, FastifyRequest } from 'fastify'

export async function me(req: FastifyRequest, res: FastifyReply) {
  return res.status(200).send({ user: req.user })
}

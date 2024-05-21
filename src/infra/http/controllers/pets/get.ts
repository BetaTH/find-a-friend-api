import { makeGetPetUseCase } from '@/infra/factories/use-cases/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const getPetBodySchema = z.object({
    petId: z.string(),
  })

  const getPetBody = getPetBodySchema.parse(req.params)
  const getPetUseCase = makeGetPetUseCase()

  const result = await getPetUseCase.execute(getPetBody)

  if (result.isRight) {
    return res.status(201)
  }
}

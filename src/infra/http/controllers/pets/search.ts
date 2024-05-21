import { makeSearchPetsUseCase } from '@/infra/factories/use-cases/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchPetBodySchema = z.object({
    state: z.string(),
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independencyLevel: z.string().optional(),
  })

  const searchPetBody = searchPetBodySchema.parse(req.query)
  const searchPetUseCase = makeSearchPetsUseCase()

  const result = await searchPetUseCase.execute(searchPetBody)

  if (result.isRight) {
    return res.status(201)
  }
}

import { makeCreatePetUseCase } from '@/infra/factories/use-cases/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createPetParamsSchema = z.object({
    orgId: z.string(),
  })

  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string().email(),
    size: z.string(),
    energyLevel: z.string(),
    independencyLevel: z.string(),
    pictures: z.array(z.string()),
    requirements: z.array(z.string()),
  })

  const { orgId } = createPetParamsSchema.parse(req.params)
  const createPetBody = createPetBodySchema.parse(req.body)
  const cretePetUseCase = makeCreatePetUseCase()

  const result = await cretePetUseCase.execute({ orgId, ...createPetBody })

  if (result.isRight) {
    return res.status(201)
  }

  if (result.value instanceof Error) {
    return res.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: result.value.message,
    })
  }
}

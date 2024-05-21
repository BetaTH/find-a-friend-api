import { AlreadyExistsError } from '@/core/errors/errors/already-exists-error'
import { makeCreateOrgUseCase } from '@/infra/factories/use-cases/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    responsiblePersonName: z.string(),
    about: z.string(),
    email: z.string().email(),
    whatsappNumber: z.string(),
    password: z.string(),
    zipCode: z.string(),
    state: z.string(),
    city: z.string(),
    complement: z.string(),
    street: z.string(),
  })

  const createOrgBody = createOrgBodySchema.parse(req.body)

  const creteOrgUseCase = makeCreateOrgUseCase()

  const result = await creteOrgUseCase.execute(createOrgBody)

  if (result.isRight) {
    return res.status(201).send({
      org: result.value.org,
    })
  }

  if (result.value instanceof AlreadyExistsError) {
    return res.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: result.value.message,
    })
  }
}

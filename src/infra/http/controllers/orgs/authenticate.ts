import { makeAuthenticateOrgUseCase } from '@/infra/factories/use-cases/make-authenticate-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const authenticateBody = authenticateBodySchema.parse(req.body)
  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  const result = await authenticateOrgUseCase.execute(authenticateBody)

  if (result.isLeft) {
    return res.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: result.value.message,
    })
  }

  const token = await res.jwtSign(
    {
      name: result.value.org.name,
      email: result.value.org.email,
    },
    {
      sign: {
        sub: result.value.org.id.toString(),
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {
      name: result.value.org.name,
      email: result.value.org.email,
    },
    { sign: { sub: result.value.org.id.toString(), expiresIn: '14d' } },
  )

  if (result.isRight) {
    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        httpOnly: true,
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .send({
        token,
      })
  }
}

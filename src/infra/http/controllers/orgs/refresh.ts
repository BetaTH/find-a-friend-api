import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await res.jwtSign(
    {
      name: req.user.name,
      email: req.user.email,
    },
    {
      sign: {
        sub: req.user.sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {
      name: req.user.name,
      email: req.user.email,
    },
    { sign: { sub: req.user.sub, expiresIn: '14d' } },
  )

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

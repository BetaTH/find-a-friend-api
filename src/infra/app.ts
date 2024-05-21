import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './lib/env'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()
// JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: true,
  },
  sign: {
    expiresIn: '60m',
  },
})
app.register(fastifyCookie)

// Routes
app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, rep) => {
  if (error instanceof ZodError) {
    return rep.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV !== 'prod') {
    console.log(error)
  } else {
    // TODO: here we should log to an external tool
  }

  return rep.status(500).send({ message: 'Internal server error!' })
})

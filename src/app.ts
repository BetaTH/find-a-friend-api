import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

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

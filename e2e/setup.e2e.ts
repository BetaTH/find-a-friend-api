import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { config } from 'dotenv'

config({ path: '.env.test', override: true })

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.pathname = `/${schemaId}`

  url.searchParams.set('schema', 'public')
  return url.toString()
}

const schemaId = randomUUID()

const databaseURL = generateUniqueDatabaseURL(schemaId)

process.env.DATABASE_URL = databaseURL

execSync('pnpm prisma migrate deploy')

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})

import { CreateOrgUseCase } from '@/domain/find-a-friend/use-cases/create-org-use-case'
import { PrismaOrgsRepository } from '@/infra/database/prisma/repositories/prisma-orgs-repository'
import { BcryptHashProvider } from '@/infra/providers/hash-provider'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const hashProvider = new BcryptHashProvider()
  const useCase = new CreateOrgUseCase(orgsRepository, hashProvider)

  return useCase
}

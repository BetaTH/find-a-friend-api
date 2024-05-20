import { AuthenticateOrgUseCase } from '@/domain/find-a-friend/use-cases/authenticate-org-use-case'
import { PrismaOrgsRepository } from '@/infra/database/prisma/repositories/prisma-orgs-repository'
import { BcryptHashProvider } from '@/infra/providers/hash-provider'

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const hashProvider = new BcryptHashProvider()
  const useCase = new AuthenticateOrgUseCase(orgsRepository, hashProvider)

  return useCase
}

import { CreatePetUseCase } from '@/domain/find-a-friend/use-cases/create-pet-use-case'
import { PrismaOrgsRepository } from '@/infra/database/prisma/repositories/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/infra/database/prisma/repositories/prisma-pets-repository'

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return useCase
}

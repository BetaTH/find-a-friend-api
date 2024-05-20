import { GetPetUseCase } from '@/domain/find-a-friend/use-cases/get-pet-use-case'
import { PrismaPetsRepository } from '@/infra/database/prisma/repositories/prisma-pets-repository'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetUseCase(petsRepository)

  return useCase
}

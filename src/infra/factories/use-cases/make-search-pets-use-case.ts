import { SearchPetsUseCase } from '@/domain/find-a-friend/use-cases/search-pets-use-case'
import { PrismaPetsRepository } from '@/infra/database/prisma/repositories/prisma-pets-repository'

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(petsRepository)

  return useCase
}

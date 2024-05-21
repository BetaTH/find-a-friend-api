import { Pet } from '../entities/pet'
import { PetsRepository } from '../repositories/pets-repository'
import { Either, right } from '@/core/either'

export type SearchPetsUseCaseRequest = {
  state: string
  city: string
  age?: string
  energyLevel?: string
  size?: string
  independencyLevel?: string
}

type SearchPetsUseCaseResponse = Either<
  null,
  {
    pets: Pet[]
  }
>
export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    requestData: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll(requestData)
    return right({ pets })
  }
}

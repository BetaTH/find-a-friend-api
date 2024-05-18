import { Pet } from '../entities/pet'
import { PetsRepository } from '../repositories/pets-repository'
import { Either, right } from '@/core/either'

export type SearchPetUseCaseRequest = {
  state: string
  city: string
  age?: string
  energyLevel?: string
  size?: string
  independencyLevel?: string
  environment?: string
}

type SearchPetUseCaseResponse = Either<
  null,
  {
    pets: Pet[]
  }
>
export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    requestData: SearchPetUseCaseRequest,
  ): Promise<SearchPetUseCaseResponse> {
    const pets = await this.petsRepository.findAll(requestData)
    return right({ pets })
  }
}

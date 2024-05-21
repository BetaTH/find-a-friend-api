import { Pet } from '../entities/pet'
import { PetsRepository } from '../repositories/pets-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export type GetPetUseCaseRequest = {
  petId: string
}

type GetPetUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    pet: Pet
  }
>
export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      return left(new ResourceNotFoundError())
    }

    return right({ pet })
  }
}

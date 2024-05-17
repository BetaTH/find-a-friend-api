import { Pet } from '../entities/pet'
import { PetsRepository } from '../repositories/pets-repository'
import { Either, left, right } from '@/core/either'
import { OrgsRepository } from '../repositories/orgs-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type CreatePetUseCaseRequest = {
  orgId: string
  name: string
  about: string
  age: string
  size: string
  energy: string
  independency: string
  environment: string
  pictures: string[]
  requirements: string[]
}

type CreatePetUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    pet: Pet
  }
>
export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    orgId,
    name,
    about,
    age,
    size,
    energy,
    independency,
    environment,
    pictures,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      return left(new ResourceNotFoundError())
    }

    const pet = Pet.create({
      orgId: new UniqueEntityID(orgId),
      name,
      about,
      age,
      size,
      energy,
      independency,
      environment,
      pictures,
      requirements,
    })

    await this.petsRepository.create(pet)

    return right({ pet })
  }
}

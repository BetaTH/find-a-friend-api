import { Pet } from '../entities/pet'
import { PetsRepository } from '../repositories/pets-repository'
import { Either, left, right } from '@/core/either'
import { OrgsRepository } from '../repositories/orgs-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SizeVO } from '../entities/value-objects/size'
import { InvalidValueError } from '@/core/errors/errors/invalid-value'
import { EnergyLevelVO } from '../entities/value-objects/energy-level'
import { IndependencyLevelVO } from '../entities/value-objects/independency-level'

export type CreatePetUseCaseRequest = {
  orgId: string
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  independencyLevel: string
  pictures: string[]
  requirements: string[]
}

type CreatePetUseCaseResponse = Either<
  ResourceNotFoundError | InvalidValueError,
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
    energyLevel,
    independencyLevel,
    pictures,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      return left(new ResourceNotFoundError())
    }

    const sizeOrError = SizeVO.create(size)
    const energyLevelOrError = EnergyLevelVO.create(energyLevel)
    const independencyLevelOrError =
      IndependencyLevelVO.create(independencyLevel)
    if (
      sizeOrError.isLeft ||
      energyLevelOrError.isLeft ||
      independencyLevelOrError.isLeft
    ) {
      return left(
        new InvalidValueError(
          `Invalid values: { 
            ${sizeOrError.isLeft && `size: ${size},`} 
            ${energyLevelOrError.isLeft && `energyLevel: ${energyLevel},`} 
            ${independencyLevelOrError.isLeft && `independencyLevel: ${independencyLevel},`} } `,
        ),
      )
    }

    const pet = Pet.create({
      orgId: new UniqueEntityID(orgId),
      name,
      about,
      age,
      size: sizeOrError.value.value,
      energyLevel: energyLevelOrError.value.value,
      independencyLevel: independencyLevelOrError.value.value,
      pictures,
      requirements,
    })

    await this.petsRepository.create(pet)

    return right({ pet })
  }
}

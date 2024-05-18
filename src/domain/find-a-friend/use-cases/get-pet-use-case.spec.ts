import { makePet } from 'tests/factories/make-pet'
import { Pet } from '../entities/pet'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pet-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetPetUseCase } from './get-pet-use-case'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-org-repository'

let orgRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
    petsRepository.items.push(
      makePet.makePetClass({}, new UniqueEntityID('test')),
    )

    const result = await sut.execute({ id: 'test' })

    expect(result.isRight).toBe(true)
    expect(result.value).toHaveProperty('pet')
    if ('pet' in result.value) {
      expect(result.value.pet).toBeInstanceOf(Pet)
    }
  })

  it('should not be able to get inexistent a pet', async () => {
    const result = await sut.execute({ id: 'test' })

    expect(result.isRight).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

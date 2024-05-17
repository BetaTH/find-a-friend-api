import { CreatePetUseCase } from './create-pet-use-case'
import { makePet } from 'tests/factories/make-pet'
import { Pet } from '../entities/pet'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-org-repository'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pet-repository'
import { makeOrg } from 'tests/factories/make-org'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgRepository)
  })

  it('should be able to create a pet', async () => {
    orgRepository.items.push(
      makeOrg.makeOrgClass({}, new UniqueEntityID('test')),
    )
    console.log(orgRepository.items)

    const result = await sut.execute(makePet.makePetObject({ orgId: 'test' }))

    expect(result.isRight).toBe(true)
    expect(result.value).toHaveProperty('pet')
    if ('pet' in result.value) {
      expect(result.value.pet).toBeInstanceOf(Pet)
    }
  })

  it('should not be able to create a pet without a org', async () => {
    const result = await sut.execute(makePet.makePetObject({ orgId: 'test' }))

    expect(result.isRight).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

import { makePet } from 'tests/factories/make-pet'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pet-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-org-repository'
import { SearchPetUseCase } from './search-pets-use-case'
import { makeOrg } from 'tests/factories/make-org'
import { makeAddress } from 'tests/factories/make-address'

let orgRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetUseCase

describe('Search Pet', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgRepository)
    sut = new SearchPetUseCase(petsRepository)
  })

  it('should be able to search a pet by state and city', async () => {
    const address01 = makeAddress({ city: 'Teresina', state: 'PI' })
    const address02 = makeAddress({ city: 'José De Freitas', state: 'PI' })
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address01 }, new UniqueEntityID('org-1')),
    )
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address01 }, new UniqueEntityID('org-2')),
    )
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address02 }, new UniqueEntityID('org-3')),
    )

    petsRepository.items.push(
      makePet.makePetClass(
        { orgId: new UniqueEntityID('org-1') },
        new UniqueEntityID('pet-1'),
      ),
    )
    petsRepository.items.push(
      makePet.makePetClass(
        { orgId: new UniqueEntityID('org-2') },
        new UniqueEntityID('pet-2'),
      ),
    )

    petsRepository.items.push(
      makePet.makePetClass(
        { orgId: new UniqueEntityID('org-3') },
        new UniqueEntityID('pet-3'),
      ),
    )

    console.log(petsRepository.items)

    const result = await sut.execute({ city: 'Teresina', state: 'PI' })

    expect(result.isRight).toBe(true)
    expect(result.value).toHaveProperty('pets')
    if (result.value && 'pets' in result.value) {
      expect(result.value.pets).toHaveLength(2)
    }
  })

  it('should be able to search a pet by state, city and size', async () => {
    const address01 = makeAddress({ city: 'Teresina', state: 'PI' })
    const address02 = makeAddress({ city: 'José De Freitas', state: 'PI' })
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address01 }, new UniqueEntityID('org-1')),
    )
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address01 }, new UniqueEntityID('org-2')),
    )
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address02 }, new UniqueEntityID('org-3')),
    )

    petsRepository.items.push(
      makePet.makePetClass(
        { orgId: new UniqueEntityID('org-1') },
        new UniqueEntityID('pet-1'),
      ),
    )
    petsRepository.items.push(
      makePet.makePetClass(
        { orgId: new UniqueEntityID('org-2'), size: 'Filhotinho' },
        new UniqueEntityID('pet-2'),
      ),
    )

    petsRepository.items.push(
      makePet.makePetClass(
        { orgId: new UniqueEntityID('org-3') },
        new UniqueEntityID('pet-3'),
      ),
    )

    console.log(petsRepository.items)

    const result = await sut.execute({
      city: 'Teresina',
      state: 'PI',
      size: 'Filhotinho',
    })

    expect(result.isRight).toBe(true)
    expect(result.value).toHaveProperty('pets')
    if (result.value && 'pets' in result.value) {
      expect(result.value.pets).toHaveLength(1)
    }
  })

  it('should be able to search a pet by state, city, size and energyLevel', async () => {
    const address01 = makeAddress({ city: 'Teresina', state: 'PI' })
    const address02 = makeAddress({ city: 'José De Freitas', state: 'PI' })
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address01 }, new UniqueEntityID('org-1')),
    )
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address01 }, new UniqueEntityID('org-2')),
    )
    orgRepository.items.push(
      makeOrg.makeOrgClass({ address: address02 }, new UniqueEntityID('org-3')),
    )

    petsRepository.items.push(
      makePet.makePetClass(
        {
          orgId: new UniqueEntityID('org-1'),
          size: 'Filhotinho',
          energyLevel: 'Ótimo',
        },
        new UniqueEntityID('pet-1'),
      ),
    )
    petsRepository.items.push(
      makePet.makePetClass(
        {
          orgId: new UniqueEntityID('org-2'),
          size: 'Filhotinho',
          energyLevel: 'muito bom',
        },
        new UniqueEntityID('pet-2'),
      ),
    )

    petsRepository.items.push(
      makePet.makePetClass(
        { orgId: new UniqueEntityID('org-3') },
        new UniqueEntityID('pet-3'),
      ),
    )

    console.log(petsRepository.items)

    const result = await sut.execute({
      city: 'Teresina',
      state: 'PI',
      size: 'Filhotinho',
      energyLevel: 'muito bom',
    })

    expect(result.isRight).toBe(true)
    expect(result.value).toHaveProperty('pets')
    if (result.value && 'pets' in result.value) {
      expect(result.value.pets).toHaveLength(1)
    }
  })
})

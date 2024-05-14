import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-org-repository'
import { CreateOrgUseCase } from './create-org-use-case'
import { makeOrg } from 'tests/factories/make-org'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a org', async () => {
    const result = await sut.execute(makeOrg())

    expect(result.isRight).toBe(true)
    expect(orgsRepository.items[0].id).toEqual(result.value?.org.id)
  })
})

import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-org-repository'
import { CreateOrgUseCase } from './create-org-use-case'
import { makeOrg } from 'tests/factories/make-org'
import { TestHashProvider } from 'tests/providers/test-hash-provider'
import { Org } from '../entities/org'
import { AlreadyExistsError } from '@/core/errors/errors/already-exists-error'

let hashProvider: TestHashProvider
let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org', () => {
  beforeEach(() => {
    hashProvider = new TestHashProvider()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository, hashProvider)
  })

  it('should be able to create a org', async () => {
    const result = await sut.execute(makeOrg.makeOrgObject())

    expect(result.isRight).toBe(true)
    expect(result.value).toHaveProperty('org')
    if ('org' in result.value) {
      expect(result.value.org).toBeInstanceOf(Org)
    }
  })

  it('should not be able to create a org with duplicated email', async () => {
    const org = makeOrg.makeOrgClass({ email: 'thielson12@gmail.com' })

    orgsRepository.items.push(org)

    const result = await sut.execute(
      makeOrg.makeOrgObject({ email: 'thielson12@gmail.com' }),
    )

    expect(result.isRight).toBe(false)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})

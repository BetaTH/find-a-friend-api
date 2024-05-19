import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-org-repository'
import { makeOrg } from 'tests/factories/make-org'
import { TestHashProvider } from 'tests/providers/test-hash-provider'
import { Org } from '../entities/org'
import { AuthenticateOrgUseCase } from './authenticate-org-use-case'
import { InvalidCredentialsError } from '@/core/errors/errors/invalid-credentials.error'

let hashProvider: TestHashProvider
let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org', () => {
  beforeEach(() => {
    hashProvider = new TestHashProvider()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository, hashProvider)
  })

  it('should be able to authenticate a org', async () => {
    const org = makeOrg.makeOrgClass({
      email: 'thielson12@gmail.com',
      passwordHash: '123456789',
    })

    orgsRepository.items.push(org)
    const result = await sut.execute({
      email: 'thielson12@gmail.com',
      password: '123456789',
    })

    expect(result.isRight).toBe(true)
    expect(result.value).toHaveProperty('org')
    if ('org' in result.value) {
      expect(result.value.org).toBeInstanceOf(Org)
    }
  })

  it('should not be able to authenticate a org with a wrong email or password', async () => {
    const org = makeOrg.makeOrgClass({
      email: 'thielson12@gmail.com',
      passwordHash: '123456789',
    })

    orgsRepository.items.push(org)
    const result = await sut.execute({
      email: 'thielson12@gmail.com',
      password: '123456',
    })

    expect(result.isRight).toBe(false)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})

import { Either, left, right } from '@/core/either'
import { Org } from '../entities/org'
import { HashProvider } from '../providers/hash-provider'
import { OrgsRepository } from '../repositories/orgs-repository'
import { InvalidCredentialsError } from '@/core/errors/errors/invalid-credentials.error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

type AuthenticateOrgUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    org: Org
  }
>

export class AuthenticateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      return left(new InvalidCredentialsError())
    }

    const doestPasswordMatches = await org.compareWithPassword(
      password,
      this.hashProvider.compare,
    )

    if (!doestPasswordMatches) {
      return left(new InvalidCredentialsError())
    }

    return right({ org })
  }
}

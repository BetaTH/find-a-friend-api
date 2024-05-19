import { AlreadyExistsError } from '@/core/errors/errors/already-exists-error'
import { Org } from '../entities/org'
import { OrgsRepository } from '../repositories/orgs-repository'
import { Address } from '../entities/value-objects/address'
import { Either, left, right } from '@/core/either'
import { HashProvider } from '../providers/hash-provider'

export type CreateOrgUseCaseRequest = {
  name: string
  responsiblePersonName: string
  about: string
  email: string
  whatsappNumber: string
  password: string
  zipCode: string
  state: string
  city: string
  complement: string
  street: string
}

type CreateOrgUseCaseResponse = Either<
  AlreadyExistsError,
  {
    org: Org
  }
>
export class CreateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute({
    about,
    name,
    responsiblePersonName,
    email,
    whatsappNumber,
    password,
    zipCode,
    state,
    city,
    complement,
    street,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email)

    if (orgByEmail) {
      return left(new AlreadyExistsError())
    }
    const address = Address.create({
      city,
      complement,
      state,
      street,
      zipCode,
    })

    const passwordHash = await this.hashProvider.hash(password)

    const org = Org.create({
      about,
      address,
      email,
      name,
      passwordHash,
      responsiblePersonName,
      whatsappNumber,
    })

    await this.orgsRepository.create(org)

    return right({ org })
  }
}

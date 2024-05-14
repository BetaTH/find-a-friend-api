import { AlreadyExistsError } from '@/core/errors/errors/already-exists-error'
import { Org } from '../entities/org'
import { OrgsRepository } from '../repositories/orgs-repository'
import { Address } from '../entities/value-objects/address'
import { Either, left, right } from '@/core/either'

type CreateOrgUseCaseRequest = {
  name: string
  responsiblePersonName: string
  about: string
  email: string
  whatsappLink: string
  password: string
  zipCode: string
  state: string
  city: string
  complement: string
  street: string
  latitude: number
  longitude: number
}

type CreateOrgUseCaseResponse = Either<
  AlreadyExistsError,
  {
    org: Org
  }
>
export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    about,
    name,
    responsiblePersonName,
    email,
    whatsappLink,
    password,
    zipCode,
    state,
    city,
    complement,
    street,
    latitude,
    longitude,
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
      latitude,
      longitude,
      zipCode,
    })

    const org = Org.create({
      about,
      address,
      email,
      name,
      password,
      responsiblePersonName,
      whatsappLink,
    })

    await this.orgsRepository.create(org)

    return right({ org })
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Org, OrgProps } from '@/domain/find-a-friend/entities/org'
import { faker } from '@faker-js/faker'
import { makeAddress } from './make-address'
import { CreateOrgUseCaseRequest } from '@/domain/find-a-friend/use-cases/create-org-use-case'

export class makeOrg {
  static makeOrgClass(overwrite?: Partial<OrgProps>, id?: UniqueEntityID) {
    const address = makeAddress()
    const org = Org.create(
      {
        about: faker.lorem.sentence(10),
        responsiblePersonName: faker.person.fullName(),
        email: faker.internet.email(),
        name: faker.company.name(),
        passwordHash: overwrite?.passwordHash ?? faker.internet.password(),
        whatsappNumber: faker.phone.number(),
        address,
        ...overwrite,
      },
      id,
    )

    return org
  }

  static makeOrgObject(overwrite?: Partial<CreateOrgUseCaseRequest>) {
    return {
      name: faker.company.name(),
      responsiblePersonName: faker.person.fullName(),
      about: faker.lorem.sentence(10),
      email: faker.internet.email(),
      whatsappNumber: faker.phone.number(),
      password: faker.internet.password(),
      zipCode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      complement: faker.location.streetAddress(),
      street: faker.location.street(),
      ...overwrite,
    }
  }
}

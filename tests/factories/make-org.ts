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
      about: faker.lorem.sentence(10),
      responsiblePersonName: faker.person.fullName(),
      zipCode: faker.location.zipCode(),
      city: faker.location.city(),
      email: faker.internet.email(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      name: faker.company.name(),
      complement: faker.location.streetAddress(),
      password: faker.internet.password(),
      state: faker.location.state(),
      street: faker.location.street(),
      whatsappNumber: faker.phone.number(),
      ...overwrite,
    }
  }
}

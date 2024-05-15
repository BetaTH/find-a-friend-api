import { randomUUID } from 'crypto'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Org, OrgProps } from '@/domain/find-a-friend/entities/org'
import { faker } from '@faker-js/faker'
import { makeAddress } from './make-address'

export class makeOrg {
  static makeOrgClass(overwrite?: Partial<OrgProps>, id?: UniqueEntityID) {
    const address = makeAddress()
    const org = Org.create(
      {
        about: faker.lorem.sentence(10),
        responsiblePersonName: faker.person.fullName(),
        email: faker.internet.email(),
        name: faker.company.name(),
        password: overwrite?.password ?? faker.internet.password(),
        whatsappLink: faker.phone.number(),
        address,
        ...overwrite,
      },
      id,
    )

    return org
  }

  static makeOrgObject(overwrite?: Partial<OrgProps>) {
    return {
      id: randomUUID(),
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
      whatsappLink: faker.phone.number(),
      ...overwrite,
    }
  }
}

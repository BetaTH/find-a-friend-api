import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password?: string
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    about: faker.lorem.sentence(10),
    responsiblePersonName: faker.person.fullName(),
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    email: faker.internet.email(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    name: faker.company.name(),
    complement: faker.location.streetAddress(),
    password: overwrite?.password ?? faker.internet.password(),
    state: faker.location.state(),
    street: faker.location.street(),
    whatsappLink: faker.phone.number(),
  }
}

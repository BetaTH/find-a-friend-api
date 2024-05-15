import { OrgProps } from '@/domain/find-a-friend/entities/org'
import { Address } from '@/domain/find-a-friend/entities/value-objects/address'
import { faker } from '@faker-js/faker'

export function makeAddress(overwrite?: Partial<OrgProps>) {
  const address = Address.create({
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    complement: faker.location.streetAddress(),
    state: faker.location.state(),
    street: faker.location.street(),
    ...overwrite,
  })
  return address
}

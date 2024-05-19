import {
  Address,
  AddressProps,
} from '@/domain/find-a-friend/entities/value-objects/address'
import { faker } from '@faker-js/faker'

export function makeAddress(overwrite?: Partial<AddressProps>) {
  const address = Address.create({
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    complement: faker.location.streetAddress(),
    street: faker.location.street(),
    ...overwrite,
  })
  return address
}

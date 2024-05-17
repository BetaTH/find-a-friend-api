import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pet, PetProps } from '@/domain/find-a-friend/entities/pet'
import { CreatePetUseCaseRequest } from '@/domain/find-a-friend/use-cases/create-pet-use-case'
import { faker } from '@faker-js/faker'

export class makePet {
  static makePetClass(overwrite?: Partial<PetProps>, id?: UniqueEntityID) {
    const pet = Pet.create(
      {
        orgId: new UniqueEntityID(),
        age: faker.lorem.sentence(10),
        size: faker.lorem.sentence(10),
        energy: faker.lorem.sentence(10),
        independency: faker.lorem.sentence(10),
        environment: faker.lorem.sentence(10),
        pictures: [faker.lorem.sentence(10)],
        requirements: [faker.lorem.sentence(10)],
        name: faker.person.firstName(),
        about: faker.lorem.sentence(10),
        ...overwrite,
      },
      id,
    )

    return pet
  }

  static makePetObject(overwrite?: Partial<CreatePetUseCaseRequest>) {
    return {
      orgId: faker.lorem.sentence(10),
      age: faker.lorem.sentence(10),
      size: faker.lorem.sentence(10),
      energy: faker.lorem.sentence(10),
      independency: faker.lorem.sentence(10),
      environment: faker.lorem.sentence(10),
      pictures: [faker.lorem.sentence(10)],
      requirements: [faker.lorem.sentence(10)],
      name: faker.person.firstName(),
      about: faker.lorem.sentence(10),
      ...overwrite,
    }
  }
}

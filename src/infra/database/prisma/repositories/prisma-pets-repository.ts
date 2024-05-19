import { Pet } from '@/domain/find-a-friend/entities/pet'
import { PetsRepository } from '@/domain/find-a-friend/repositories/pets-repository'
import { SearchPetUseCaseRequest } from '@/domain/find-a-friend/use-cases/search-pets-use-case'
import { PrismaPetMapper } from '../mappers/prisma-pet-mapper'
import { prisma } from '../prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(pet: Pet) {
    const petPrisma = PrismaPetMapper.toPersistence(pet)

    await prisma.pet.create({
      data: petPrisma,
    })
  }

  async findById(id: string) {
    const petPrisma = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!petPrisma) {
      return null
    }

    const pet = PrismaPetMapper.toDomain(petPrisma)

    return pet
  }

  async findAll(params: SearchPetUseCaseRequest) {
    const petsPrisma = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energyLevel: params.energyLevel,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
          state: {
            contains: params.state,
            mode: 'insensitive',
          },
        },
      },
    })

    if (petsPrisma.length === 0) {
      return []
    }

    const pets = petsPrisma.map(PrismaPetMapper.toDomain)

    return pets
  }
}

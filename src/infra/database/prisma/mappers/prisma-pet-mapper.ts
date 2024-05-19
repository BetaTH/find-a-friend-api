import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pet } from '@/domain/find-a-friend/entities/pet'
import { EnergyLevel } from '@/domain/find-a-friend/entities/value-objects/energy-level'
import { IndependencyLevel } from '@/domain/find-a-friend/entities/value-objects/independency-level'
import { Size } from '@/domain/find-a-friend/entities/value-objects/size'
import { Pet as PrismaPet } from '@prisma/client'

export class PrismaPetMapper {
  static toDomain(raw: PrismaPet): Pet {
    return Pet.create(
      {
        orgId: new UniqueEntityID(raw.orgId),
        name: raw.name,
        about: raw.about,
        age: raw.age,
        size: raw.size as Size,
        energyLevel: raw.energyLevel as EnergyLevel,
        independencyLevel: raw.independencyLevel as IndependencyLevel,
        pictures: raw.pictures,
        requirements: raw.requirements,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(pet: Pet): PrismaPet {
    return {
      id: pet.id.toString(),
      orgId: pet.orgId.toString(),
      name: pet.name,
      about: pet.about,
      age: pet.age,
      size: pet.size,
      energyLevel: pet.energyLevel,
      independencyLevel: pet.independencyLevel,
      pictures: pet.pictures,
      requirements: pet.requirements,
    }
  }
}

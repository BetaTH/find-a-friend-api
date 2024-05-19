import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Org } from '@/domain/find-a-friend/entities/org'
import { Address } from '@/domain/find-a-friend/entities/value-objects/address'
import { Org as PrismaOrg } from '@prisma/client'

export class PrismaOrgMapper {
  static toDomain(raw: PrismaOrg): Org {
    const address = Address.create({
      city: raw.city,
      complement: raw.complement,
      state: raw.state,
      street: raw.street,
      zipCode: raw.zipCode,
    })

    return Org.create(
      {
        about: raw.about,
        name: raw.name,
        email: raw.email,
        whatsappNumber: raw.whatsappNumber,
        responsiblePersonName: raw.responsiblePersonName,
        passwordHash: raw.passwordHash,
        address,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(org: Org): PrismaOrg {
    return {
      id: org.id.toString(),
      name: org.name,
      about: org.about,
      email: org.email,
      whatsappNumber: org.whatsappNumber,
      responsiblePersonName: org.responsiblePersonName,
      passwordHash: org.passwordHash,
      city: org.address.city,
      complement: org.address.complement,
      state: org.address.state,
      street: org.address.street,
      zipCode: org.address.zipCode,
    }
  }
}

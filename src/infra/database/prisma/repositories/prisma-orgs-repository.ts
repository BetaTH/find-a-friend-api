import { OrgsRepository } from '@/domain/find-a-friend/repositories/orgs-repository'
import { PrismaOrgMapper } from '../mappers/prisma-org-mapper'
import { prisma } from '../prisma'
import { Org } from '@/domain/find-a-friend/entities/org'
export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string): Promise<Org | null> {
    const orgPrisma = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    if (!orgPrisma) {
      return null
    }
    const org = PrismaOrgMapper.toDomain(orgPrisma)
    return org
  }

  async create(org: Org) {
    const orgPrisma = PrismaOrgMapper.toPersistence(org)

    await prisma.org.create({
      data: orgPrisma,
    })
  }

  async findById(id: string) {
    const orgPrisma = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    if (!orgPrisma) {
      return null
    }

    const org = PrismaOrgMapper.toDomain(orgPrisma)

    return org
  }
}

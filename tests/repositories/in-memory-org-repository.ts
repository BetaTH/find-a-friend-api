import { Org } from '@/domain/find-a-friend/entities/org'
import { OrgsRepository } from '@/domain/find-a-friend/repositories/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)
    if (!org) {
      return null
    }
    return org
  }

  async create(org: Org) {
    this.items.push(org)
  }
}

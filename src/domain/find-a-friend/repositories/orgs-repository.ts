import { Org } from '../entities/org'

export abstract class OrgsRepository {
  abstract create(org: Org): Promise<void>
  abstract findByEmail(email: string): Promise<Org | null>
  abstract findById(id: string): Promise<Org | null>
}

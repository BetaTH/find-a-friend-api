import { Org } from "../entities/org"

export interface OrgRepository {
  create(org: Org): Promise<Org>
}

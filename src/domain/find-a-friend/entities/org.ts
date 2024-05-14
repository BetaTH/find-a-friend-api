import { AggregateRoot } from "@/core/entities/aggregate-root"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface OrgProps {
  responsiblePersonName: string
  email: string
  about: string
  cep: string
  city: string
  state: string
  password: string
  whatsappLink: string
}

export class Org extends AggregateRoot<OrgProps> {

  static create(
    props: OrgProps,
    id?: UniqueEntityID,
  ) {
    const org = new Org(
      {
        ...props,
      },
      id,
    )
    return org
  }
}

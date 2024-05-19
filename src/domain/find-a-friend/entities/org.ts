import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address } from './value-objects/address'
import { Entity } from '@/core/entities/entity'

export interface OrgProps {
  name: string
  responsiblePersonName: string
  email: string
  about: string
  address: Address
  passwordHash: string
  whatsappNumber: string
}

export class Org extends Entity<OrgProps> {
  get name() {
    return this.props.name
  }

  get responsiblePersonName() {
    return this.props.responsiblePersonName
  }

  get email() {
    return this.props.email
  }

  get about() {
    return this.props.about
  }

  get address() {
    return this.props.address
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  get whatsappNumber() {
    return this.props.whatsappNumber
  }

  static create(props: OrgProps, id?: UniqueEntityID) {
    const org = new Org(
      {
        ...props,
      },
      id,
    )
    return org
  }
}

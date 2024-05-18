import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PetProps {
  orgId: UniqueEntityID
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  independencyLevel: string
  environment: string
  pictures: string[]
  requirements: string[]
}

export class Pet extends Entity<PetProps> {
  get orgId() {
    return this.props.orgId
  }

  get name() {
    return this.props.name
  }

  get age() {
    return this.props.age
  }

  get size() {
    return this.props.size
  }

  get energyLevel() {
    return this.props.energyLevel
  }

  get independencyLevel() {
    return this.props.independencyLevel
  }

  get environment() {
    return this.props.environment
  }

  get pictures() {
    return this.props.pictures
  }

  get requirements() {
    return this.props.requirements
  }

  static create(props: PetProps, id?: UniqueEntityID) {
    const pet = new Pet(
      {
        ...props,
      },
      id,
    )
    return pet
  }
}

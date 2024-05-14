import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PetProps {
  orgId: string
  name: string
  about: string
  age: string
  size: string
  energy: string
  independency: string
  environment: string
  pictures: string[]
  requirements: string[]
}

export class Pet extends AggregateRoot<PetProps> {
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

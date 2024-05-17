import { Pet } from '@/domain/find-a-friend/entities/pet'
import { PetsRepository } from '@/domain/find-a-friend/repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(pet: Pet) {
    this.items.push(pet)
  }
}

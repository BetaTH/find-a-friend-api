import { Pet } from '@/domain/find-a-friend/entities/pet'
import { PetsRepository } from '@/domain/find-a-friend/repositories/pets-repository'
import { InMemoryOrgsRepository } from './in-memory-org-repository'
import { SearchPetUseCaseRequest } from '@/domain/find-a-friend/use-cases/search-pets-use-case'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(pet: Pet) {
    this.items.push(pet)
  }

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id.toString() === id)
    if (!pet) {
      return null
    }
    return pet
  }

  async findAll(params: SearchPetUseCaseRequest): Promise<Pet[]> {
    const orgsByStateAndCity = this.orgsRepository.items.filter(
      (org) =>
        org.address.city === params.city && org.address.state === params.state,
    )

    const pets = this.items
      .filter((item) =>
        orgsByStateAndCity.some(
          (org) => org.id.toString() === item.orgId.toString(),
        ),
      )
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energyLevel ? item.energyLevel === params.energyLevel : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }
}

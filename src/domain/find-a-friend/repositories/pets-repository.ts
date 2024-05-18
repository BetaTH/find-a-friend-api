import { Pet } from '../entities/pet'
import { SearchPetUseCaseRequest } from '../use-cases/search-pets-use-case'

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<void>
  abstract findById(id: string): Promise<Pet | null>
  abstract findAll(params: SearchPetUseCaseRequest): Promise<Pet[]>
}

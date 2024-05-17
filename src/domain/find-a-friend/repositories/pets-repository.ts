import { Pet } from '../entities/pet'

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<void>
}

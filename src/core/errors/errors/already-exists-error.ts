import { UseCaseError } from '../use-case-error'

export class AlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('E-mail already exists.')
  }
}

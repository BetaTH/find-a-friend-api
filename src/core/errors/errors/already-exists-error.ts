import { UseCaseError } from '../use-case-error'

export class AlreadyExistsError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message || 'E-mail already exists.')
  }
}

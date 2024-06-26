import { UseCaseError } from '../use-case-error'

export class InvalidCredentialsError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message || 'Invalid credentials.')
  }
}

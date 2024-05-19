import { UseCaseError } from '../use-case-error'

export class InvalidValueError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message || 'Invalid value.')
  }
}

import { InvalidValueError } from '@/core/errors/errors/invalid-value'
import { IndependencyLevelVO } from './independency-level'

describe('Validate Independency Level Value Object', () => {
  it('should be able to create a Independency Level Value Object', () => {
    const independencyLevelOrError = IndependencyLevelVO.create('Alto')
    expect(independencyLevelOrError.isRight).toBe(true)
    if (independencyLevelOrError.isRight) {
      expect(independencyLevelOrError.value.value).toBe('Alto')
    }
  })

  it('should not be able to create a Independency Level Value Object with wrong Value', () => {
    const independencyLevelOrError = IndependencyLevelVO.create('wrong value')
    expect(independencyLevelOrError.isRight).toBe(false)
    expect(independencyLevelOrError.value).toBeInstanceOf(InvalidValueError)
  })
})

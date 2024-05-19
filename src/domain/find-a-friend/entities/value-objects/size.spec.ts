import { InvalidValueError } from '@/core/errors/errors/invalid-value'
import { SizeVO } from './size'

describe('Validate Size Value Object', () => {
  it('should be able to create a Size Value Object', () => {
    const sizeOrError = SizeVO.create('Pequeno')
    expect(sizeOrError.isRight).toBe(true)
  })

  it('should not be able to create a Size Value Object with wrong Value', () => {
    const sizeOrError = SizeVO.create('wrong value')
    expect(sizeOrError.isRight).toBe(false)
    expect(sizeOrError.value).toBeInstanceOf(InvalidValueError)
  })
})

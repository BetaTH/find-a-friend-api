import { InvalidValueError } from '@/core/errors/errors/invalid-value'
import { EnergyLevelVO } from './energy-level'

describe('Validate Energy Level Value Object', () => {
  it('should be able to create a Energy Level Value Object', () => {
    const energyLevelOrError = EnergyLevelVO.create('Baixo')
    expect(energyLevelOrError.isRight).toBe(true)
    if (energyLevelOrError.isRight) {
      expect(energyLevelOrError.value.value).toBe('Baixo')
    }
  })

  it('should not be able to create a Energy Level Value Object with wrong Value', () => {
    const energyLevelOrError = EnergyLevelVO.create('wrong value')
    expect(energyLevelOrError.isRight).toBe(false)
    expect(energyLevelOrError.value).toBeInstanceOf(InvalidValueError)
  })
})

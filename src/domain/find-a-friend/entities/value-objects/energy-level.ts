import { Either, left, right } from '@/core/either'
import { InvalidValueError } from '@/core/errors/errors/invalid-value'

export enum EnergyLevel {
  LOW = 'Baixo',
  MEDIUM = 'Médio',
  HIGH = 'Alto',
}

export class EnergyLevelVO {
  public value: EnergyLevel

  private constructor(value: EnergyLevel) {
    this.value = value
  }

  public static create(
    value: string,
  ): Either<InvalidValueError, EnergyLevelVO> {
    if (!Object.values(EnergyLevel).includes(value as EnergyLevel)) {
      return left(new InvalidValueError())
    }
    return right(new EnergyLevelVO(value as EnergyLevel))
  }
}

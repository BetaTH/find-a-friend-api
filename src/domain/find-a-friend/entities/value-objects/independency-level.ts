import { Either, left, right } from '@/core/either'
import { InvalidValueError } from '@/core/errors/errors/invalid-value'

export enum IndependencyLevel {
  LOW = 'Baixo',
  MEDIUM = 'Médio',
  HIGH = 'Alto',
}

export class IndependencyLevelVO {
  public value: IndependencyLevel

  private constructor(value: IndependencyLevel) {
    this.value = value
  }

  public static create(
    value: string,
  ): Either<InvalidValueError, IndependencyLevelVO> {
    if (
      !Object.values(IndependencyLevel).includes(value as IndependencyLevel)
    ) {
      return left(new InvalidValueError())
    }
    return right(new IndependencyLevelVO(value as IndependencyLevel))
  }
}

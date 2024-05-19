import { Either, left, right } from '@/core/either'
import { InvalidValueError } from '@/core/errors/errors/invalid-value'

export enum Size {
  LITTLE = 'Pequenino',
  SMALL = 'Pequeno',
  MEDIUM = 'Médio',
  LARGE = 'Grande',
  VERY_LARGE = 'Muito Grande',
}

export class SizeVO {
  public value: Size

  private constructor(value: Size) {
    this.value = value
  }

  public static create(value: string): Either<InvalidValueError, SizeVO> {
    if (!Object.values(Size).includes(value as Size)) {
      return left(new InvalidValueError())
    }
    return right(new SizeVO(value as Size))
  }
}

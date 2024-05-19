export interface AddressProps {
  zipCode: string
  city: string
  state: string
  street: string
  complement: string
}

export class Address {
  public zipCode: string
  public city: string
  public state: string
  public street: string
  public complement: string

  private constructor({
    city,
    state,
    complement,
    street,
    zipCode,
  }: AddressProps) {
    this.zipCode = zipCode
    this.city = city
    this.state = state
    this.street = street
    this.complement = complement
  }

  static create(orgProps: AddressProps) {
    return new Address(orgProps)
  }
}

export interface AddressPros {
  zipCode: string
  city: string
  state: string
  latitude: number
  longitude: number
  street: string
  complement: string
}

export class Address {
  public zipCode: string
  public city: string
  public state: string
  public street: string
  public latitude: number
  public longitude: number
  public complement: string

  private constructor({
    city,
    latitude,
    longitude,
    state,
    complement,
    street,
    zipCode,
  }: AddressPros) {
    this.zipCode = zipCode
    this.city = city
    this.state = state
    this.street = street
    this.complement = complement
    this.latitude = latitude
    this.longitude = longitude
  }

  static create(orgProps: AddressPros) {
    return new Address(orgProps)
  }
}

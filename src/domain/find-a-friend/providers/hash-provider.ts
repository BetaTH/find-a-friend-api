export interface HashProvider {
  hash(value: string): Promise<string>
  compare(value: string, hashValue: string): Promise<boolean>
}

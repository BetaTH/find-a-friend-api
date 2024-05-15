import { HashProvider } from '@/domain/find-a-friend/providers/hash-provider'

export class TestHashProvider implements HashProvider {
  async hash(value: string): Promise<string> {
    return value
  }

  async compare(value: string, hashValue: string): Promise<boolean> {
    return value === hashValue
  }
}

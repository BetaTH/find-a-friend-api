import { hash as bcryptjsHash, compare as bcryptjsCompare } from 'bcryptjs'
import { HashProvider } from '@/domain/find-a-friend/providers/hash-provider'

export class BcryptHashProvider implements HashProvider {
  async compare(value: string, hashValue: string) {
    return await bcryptjsCompare(value, hashValue)
  }

  async hash(value: string) {
    return await bcryptjsHash(value, 6)
  }
}

import { base32 } from 'multiformats/bases/base32'

import { Extends } from '~utils/decorators.js'
import { Playable } from '~utils/playable.js'
import type { EntryInstance } from '~entry/interface.js'
import type { Manifest } from '~manifest/index.js'

import protocol, { Config } from './protocol.js'
import { wildcard } from '../util.js'
import type { AccessInstance, AccessStatic } from '../interface.js'

@Extends<AccessStatic>()
// the Static in StaticAccess means the ACL is immutable and does not change
export class StaticAccess extends Playable implements AccessInstance {
  readonly manifest: Manifest
  readonly config: Config
  readonly write: Set<string>

  constructor ({ manifest }: { manifest: Manifest }) {
    const starting = async (): Promise<void> => {
      if (!Array.isArray(this.config.write) || this.config.write.length === 0) {
        throw new Error(
          'manifest.access.write does not grant access to any writers'
        )
      }
    }
    const stopping = async (): Promise<void> => {}
    super({ starting, stopping })

    this.manifest = manifest
    this.config = manifest?.access?.config

    if (!Array.isArray(this.config?.write)) {
      throw new Error('expected manifest.access.config.write to be an array')
    }

    this.write = new Set(
      this.config.write.map((w: Uint8Array | string) =>
        typeof w === 'string' ? w : base32.encode(w)
      )
    )
  }

  static get protocol (): typeof protocol {
    return protocol
  }

  async close (): Promise<void> {
    return undefined
  }

  async canAppend (entry: EntryInstance<any>): Promise<boolean> {
    // entry signature has already been validated
    const string = base32.encode(entry.identity.id)
    return this.write.has(string) || this.write.has(wildcard)
  }
}

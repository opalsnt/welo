import EventEmitter from 'events'

import { Replica } from '../../database/replica.js'
import { Extends } from '../../decorators.js'
import { StoreStatic, StoreInstance, Open } from '../interface'
import { ManifestData, ManifestInstance } from '../../manifest/interface.js'
import { creators, selectors, init, reducer } from './model'
import protocol, { Store, Config } from './protocol.js'

interface ManifestValue extends ManifestData {
  store: Store
}

@Extends<StoreStatic>()
export class Keyvalue implements StoreInstance {
  static get protocol (): string {
    return protocol
  }

  get creators (): typeof creators {
    return creators
  }

  get selectors (): typeof selectors {
    return selectors
  }

  get index (): Map<string, any> {
    return this._index
  }

  private _index: Map<string, any>

  readonly manifest: ManifestInstance<ManifestValue>
  readonly config?: Config
  readonly replica: Replica
  events: EventEmitter

  private _isStarted: boolean
  private _isMid: boolean // is starting or stopping

  isStarted (): boolean {
    return this._isStarted
  }

  async start (): Promise<void> {
    if (this.isStarted() || this._isMid) { return }
    this._isMid = true

    this._index = init()
    await this.update()

    this._isStarted = true
    this._isMid = false
  }

  async stop (): Promise<void> {
    if (this.isStarted() || this._isMid) { return }
    this._isMid = true

    this._index = init()

    this._isStarted = false
    this._isMid = false
  }

  constructor ({ manifest, replica }: { manifest: ManifestInstance<ManifestValue>, replica: Replica }) {
    this.manifest = manifest
    this.config = manifest.store.config
    this.replica = replica
    this._isStarted = false
    this._isMid = false

    this._index = init()

    this.events = new EventEmitter()
  }

  static async open (open: Open): Promise<Keyvalue> {
    return new Keyvalue(open)
  }

  async close (): Promise<void> {
    this._index = init()
  }

  async update (): Promise<void> {
    const index = init()
    for await (const entry of await this.replica.traverse()) {
      reducer(index, entry)
    }
    this._index = index
    this.events.emit('update')
  }
}
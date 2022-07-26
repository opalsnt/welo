import type { Protocol } from '~manifest/interface.js'

import protocolPrefix from '../prefix.js'

const type = 'static'
const protocol: '/opalsnt/access/static' = `${protocolPrefix}${type}`

export interface Config {
  write: Array<string | Uint8Array>
}

export interface AccessProtocol extends Protocol {
  protocol: string
  config: Config
}

export default protocol

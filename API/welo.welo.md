<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [welo](./welo.md) &gt; [Welo](./welo.welo.md)

## Welo class

Database Factory

<b>Signature:</b>

```typescript
export declare class Welo extends Playable 
```
<b>Extends:</b> [Playable](./welo.playable.md)

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)({ directory, identity, blocks, identities, keychain, ipfs, libp2p })](./welo.welo._constructor_.md) |  | Constructs a new instance of the <code>Welo</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [blocks](./welo.welo.blocks.md) | <code>readonly</code> | Blocks |  |
|  [Datastore?](./welo.welo.datastore.md) | <code>static</code> | DatastoreClass | <i>(Optional)</i> |
|  [directory](./welo.welo.directory.md) | <code>readonly</code> | string |  |
|  [events](./welo.welo.events.md) | <code>readonly</code> | EventEmitter&lt;Events&gt; |  |
|  [identities](./welo.welo.identities.md) | <code>readonly</code> | Datastore \| null |  |
|  [identity](./welo.welo.identity.md) | <code>readonly</code> | IdentityInstance&lt;any&gt; |  |
|  [ipfs](./welo.welo.ipfs.md) | <code>readonly</code> | IPFS |  |
|  [keychain](./welo.welo.keychain.md) | <code>readonly</code> | KeyChain |  |
|  [libp2p](./welo.welo.libp2p.md) | <code>readonly</code> | Libp2p |  |
|  [opened](./welo.welo.opened.md) | <code>readonly</code> | Map&lt;string, [Database](./welo.database.md)<!-- -->&gt; |  |
|  [registry](./welo.welo.registry.md) | <p><code>readonly</code></p><p><code>static</code></p> | Registry |  |
|  [Replicator?](./welo.welo.replicator.md) | <code>static</code> | ReplicatorClass | <i>(Optional)</i> |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [create(options)](./welo.welo.create.md) | <code>static</code> | Create an Welo instance |
|  [determine(options)](./welo.welo.determine.md) |  | Deterministically create a database manifest |
|  [fetch(address, options)](./welo.welo.fetch.md) |  | Fetch a Database Manifest |
|  [open(manifest, options)](./welo.welo.open.md) |  | Opens a database for a manifest. |

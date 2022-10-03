import { metadata } from "@project-serum/token"
import { Program, Provider, web3, utils } from "@project-serum/anchor"
import { IDL, Xnft } from "types/xnft"
import { externalResourceUri } from "@coral-xyz/common-public"

export function xnftClient(provider: Provider): Program<Xnft> {
  return new Program<Xnft>(IDL, XNFT_PROGRAM_ID, provider)
}

export const XNFT_PROGRAM_ID = new web3.PublicKey(
  "BaHSGaf883GA3u8qSC5wNigcXyaScJLSBJZbALWvPcjs"
)

/**
 * Fetch installed xNFTs.
 */
export async function fetchInstalls(
  provider: Provider,
  wallet?: web3.PublicKey
): Promise<
  Array<{ publicKey: web3.PublicKey; medtadata: any; metadataBlob: any }>
> {
  const client = xnftClient(provider)

  //
  // Fetch all xnfts installed by this user.
  //
  const filters = []

  if (wallet) {
    filters.push({
      memcmp: {
        offset: 8, // Discriminator
        bytes: wallet.toString(),
      },
    })
  }

  const xnftInstalls = await client.account.install.all(filters)

  //
  // Get the metadata accounts for all xnfts.
  //
  const metadataPubkeys = xnftInstalls.map(
    ({ account }) => account.masterMetadata
  )
  const xnftMetadata = (
    await utils.rpc.getMultipleAccounts(provider.connection, metadataPubkeys)
  ).map((t) => {
    if (!t) {
      return null
    }
    return metadata.decodeMetadata(t.account.data)
  })

  //
  // Fetch the metadata uri blob.
  //
  const xnftMetadataBlob = await Promise.all(
    xnftMetadata.map((m) => {
      if (!m) {
        return null
      }
      return fetch(externalResourceUri(m.data.uri)).then((r) => r.json())
    })
  )

  //
  // Combine it all into a single list.
  //
  const xnfts = [] as any
  metadataPubkeys.forEach((metadataPublicKey, idx) => {
    xnfts.push({
      metadataPublicKey,
      metadata: xnftMetadata[idx],
      metadataBlob: xnftMetadataBlob[idx],
      install: xnftInstalls[idx],
    })
  })

  return xnfts
}

/**
 * Fetch installed xNFTs.
 */
export async function fetchXNFTs(
  provider: Provider,
  wallet?: web3.PublicKey
): Promise<
  Array<{ publicKey: web3.PublicKey; medtadata: any; metadataBlob: any }>
> {
  const client = xnftClient(provider)

  //
  // Fetch all xnfts installed by this user.
  //
  const filters = []

  if (wallet) {
    filters.push({
      memcmp: {
        offset: 8, // Discriminator
        bytes: wallet.toString(),
      },
    })
  }

  const xnftInstalls = await client.account.xnft.all(filters)

  //
  // Get the metadata accounts for all xnfts.
  //
  const metadataPubkeys = xnftInstalls.map(
    ({ account }) => account.masterMetadata
  )
  const xnftMetadata = (
    await utils.rpc.getMultipleAccounts(provider.connection, metadataPubkeys)
  ).map((t) => {
    if (!t) {
      return null
    }
    return metadata.decodeMetadata(t.account.data)
  })

  //
  // Fetch the metadata uri blob.
  //
  const xnftMetadataBlob = await Promise.all(
    xnftMetadata.map((m) => {
      if (!m) {
        return null
      }
      return fetch(externalResourceUri(m.data.uri)).then((r) => r.json())
    })
  )

  //
  // Combine it all into a single list.
  //
  const xnfts = [] as any
  metadataPubkeys.forEach((metadataPublicKey, idx) => {
    xnfts.push({
      metadataPublicKey,
      metadata: xnftMetadata[idx],
      metadataBlob: xnftMetadataBlob[idx],
      install: xnftInstalls[idx],
    })
  })

  return xnfts
}

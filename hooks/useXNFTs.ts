import { useConnection } from "@solana/wallet-adapter-react"
import { web3, AnchorProvider } from "@project-serum/anchor"
import { useCallback, useEffect, useState } from "react"
import { fetchInstalls, fetchXNFTs } from "lib/xnfts"
import { metadata } from "@project-serum/token"

export type ParsedXnft = {
  publicKey: web3.PublicKey
  metadata: metadata.Metadata
  metadataBlob: any
}
const useXNFTs = () => {
  const { connection } = useConnection()
  const [xnfts, setXnfts] = useState<ParsedXnft[]>(null)

  const fetchAll = useCallback(async () => {
    /** Read-only wallet. */
    const dummyWallet = web3.Keypair.generate()

    // @ts-ignore
    const provider = new AnchorProvider(connection, dummyWallet, {
      commitment: "confirmed",
    })

    // const installs = await fetchInstalls(provider)
    // console.log(installs)

    console.time("Fetched")
    const xnfts = await fetchXNFTs(provider)
    setXnfts(xnfts)
    console.timeEnd("Fetched")
    console.log(xnfts)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { xnfts }
}

export default useXNFTs

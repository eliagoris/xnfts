import { useConnection } from "@solana/wallet-adapter-react"
import { web3, AnchorProvider, ProgramAccount } from "@project-serum/anchor"
import { useCallback, useEffect, useState } from "react"
import { fetchInstalls, fetchXNFTs } from "lib/xnfts"
import { metadata } from "@project-serum/token"
import { Xnft, IDL } from "types/xnft"
import {
  IdlTypes,
  TypeDef,
} from "@project-serum/anchor/dist/cjs/program/namespace/types"
import { getCreateXnftInstruction } from "lib/create-xnft"

export type ParsedXnft = {
  publicKey: web3.PublicKey
  metadata: metadata.Metadata
  metadataBlob: any
  programAccount: ProgramAccount<
    TypeDef<typeof IDL.accounts[0], IdlTypes<typeof IDL>>
  >
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

    console.time("Fetched")
    const xnfts = await fetchXNFTs(provider)
    console.timeEnd("Fetched")
    console.log(xnfts)

    const ordered = xnfts.sort((a, b) =>
      a.metadata.data.name.localeCompare(b.metadata.data.name)
    )
    setXnfts(ordered)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  useEffect(() => {
    ;(async () => {
      /** Read-only wallet. */
      const dummyWallet = web3.Keypair.generate()

      // @ts-ignore
      const provider = new AnchorProvider(connection, dummyWallet, {
        commitment: "confirmed",
      })

      try {
        const ix = await getCreateXnftInstruction(provider)

        const tx = new web3.Transaction()
        tx.add(ix)

        const txid = await connection.sendTransaction(tx, [dummyWallet])
        console.log(txid)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return { xnfts }
}

export default useXNFTs

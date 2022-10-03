import { useConnection } from "@solana/wallet-adapter-react"
import { web3, AnchorProvider } from "@project-serum/anchor"
import { useCallback, useEffect } from "react"
import { fetchInstalls, fetchXNFTs } from "lib/xnfts"

const useXNFTs = () => {
  const { connection } = useConnection()

  const fetchAll = useCallback(async () => {
    /** Read-only wallet. */
    const dummyWallet = web3.Keypair.generate()

    // @ts-ignore
    const provider = new AnchorProvider(connection, dummyWallet, {
      commitment: "confirmed",
    })

    // const installs = await fetchInstalls(provider)
    // console.log(installs)

    console.log("fetching...")
    const xnfts = await fetchXNFTs(provider)
    console.log("finished")
    console.log(xnfts)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])
}

export default useXNFTs

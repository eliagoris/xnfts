import { useConnection } from "@solana/wallet-adapter-react"
import { web3, AnchorProvider } from "@project-serum/anchor"
import { useEffect } from "react"
import { fetchInstalls } from "lib/xnfts"

const useXNFTs = () => {
  const { connection } = useConnection()
  useEffect(() => {
    ;(async () => {
      /** Read-only wallet. */
      const dummyWallet = web3.Keypair.generate()

      // @ts-ignore
      const provider = new AnchorProvider(connection, dummyWallet, {
        commitment: "confirmed",
      })

      const installs = await fetchInstalls(provider)
      console.log(installs)
    })()
  })
}

export default useXNFTs

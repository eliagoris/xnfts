import { BN, Provider, web3 } from "@project-serum/anchor"
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"
import { IDL } from "types/xnft"
import { xnftClient, XNFT_PROGRAM_ID } from "./xnfts"

export const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
)

export const findXnftAddress = ({
  title,
  publisher,
}: {
  title: string
  publisher: web3.PublicKey
}) =>
  findProgramAddressSync(
    [Buffer.from(title), publisher.toBuffer()],
    XNFT_PROGRAM_ID
  )[0]

export const getCreateXnftInstruction = async (provider: Provider) => {
  const client = xnftClient(provider)

  const title = "xnft22"

  const publisher = web3.Keypair.generate()
  console.log("publisher ")
  console.log(publisher.secretKey.toString())

  const collection = web3.Keypair.generate()
  console.log("collection ")
  console.log(collection.secretKey.toString())

  const xnft = findXnftAddress({
    title: title,
    publisher: publisher.publicKey,
  })

  type Params = TypeDef<typeof IDL.types[1], typeof IDL>

  const params: Params & {
    kind: never
    l1: never
    tag: never
  } = {
    collection: collection.publicKey,
    creators: [
      {
        address: publisher.publicKey,
        share: 100,
      },
    ],
    installPrice: new BN(0),
    installVault: publisher.publicKey,
    // kind: new XnftAppKind() as never,
    // l1: new SolanaL1Kind() as never,
    // tag: new NftTagKind() as never,
    kind: { app: {} } as never,
    l1: { solana: {} } as never,
    tag: { none: {} } as never,
    sellerFeeBasisPoints: 500,
    supply: new BN(0),
    symbol: "9549",
    uri: "",
  }

  const ix = await client.methods
    .createXnft(title, params)
    .accounts({
      metadataProgram: TOKEN_METADATA_PROGRAM_ID,
      xnft,
      masterToken: publisher.publicKey,
    })
    .instruction()

  return ix
}

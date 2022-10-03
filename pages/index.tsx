/** @jsxImportSource theme-ui */

import { Heading, Text, Label, Flex } from "@theme-ui/components"

import Header from "@/components/Header/Header"
import useXNFTs from "@/hooks/useXNFTs"
import { LoadingIcon } from "@/components/icons/LoadingIcon"
import XnftItem from "@/components/XnftItem"

export default function Home() {
  const { xnfts } = useXNFTs()

  return (
    <>
      {/* <Header /> */}
      <main
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "64rem",
          margin: "0 auto",
          marginTop: "4rem",
          padding: "0 1.6rem",
        }}
      >
        <Heading mb=".8rem" variant="heading1">
          Minted xNFTs
        </Heading>
        <Text>
          List of minted (or published) xNFTs on{" "}
          {process.env.NEXT_PUBLIC_CONNECTION_NETWORK}:
        </Text>

        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: "3.2rem",
          }}
        >
          {xnfts ? (
            <div
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.6rem",
                alignItems: "flex-start",

                "@media (min-width: 768px)": {
                  gridTemplateColumns:
                    xnfts.length > 9
                      ? "1fr 1fr 1fr 1fr"
                      : xnfts.length > 4
                      ? "1fr 1fr 1fr 1fr"
                      : xnfts.map(() => "1fr").join(" "),
                },
              }}
            >
              {xnfts.map((xnft) => {
                /** @TODO: xnft object doesn't have pub key */
                // if (!xnft.publicKey) {
                //   console.log(xnft)
                // }
                return (
                  <XnftItem key={xnft.metadata.mint.toString()} item={xnft} />
                )
              })}
            </div>
          ) : (
            <Text
              sx={{
                padding: "3.2rem 0",
              }}
            >
              <LoadingIcon />
            </Text>
          )}
        </Flex>
      </main>

      <footer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "4rem 0",
        }}
      ></footer>
    </>
  )
}

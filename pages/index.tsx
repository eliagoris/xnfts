/** @jsxImportSource theme-ui */

import { Heading, Text, Label } from "@theme-ui/components"

import Header from "@/components/Header/Header"
import useWalletNFTs from "@/hooks/useWalletNFTs"
import useXNFTs from "@/hooks/useXNFTs"

export default function Home() {
  useXNFTs()

  return (
    <>
      <Header />
      <main
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "64rem",
          margin: "0 auto",
          marginTop: "4rem",
        }}
      >
        <Heading mb=".8rem" variant="heading1">
          xNFTs
        </Heading>
        <Text>xNFT apps</Text>
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

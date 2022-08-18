/** @jsxImportSource theme-ui */
import Head from "next/head"

import { Heading, Text } from "@theme-ui/components"

import Header from "@/components/Header/Header"

export default function Home() {
  return (
    <>
      <Header />
      <main
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <Heading mb=".8rem" variant="heading1">
          Solana Web App template
        </Heading>
        <Text>Quickstart template to build Solana web3 applications</Text>
      </main>

      <footer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "4rem 0",
        }}
      >
        Created by
        <a
          href="https://github.com/mentalabsio"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "0.2em",
          }}
        >
          <Text
            variant="small"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Menta Labs
          </Text>
        </a>
      </footer>
    </>
  )
}

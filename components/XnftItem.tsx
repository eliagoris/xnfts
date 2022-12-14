/** @jsxImportSource theme-ui */
import React, { useRef, useState } from "react"
import { Button, Flex, Text } from "theme-ui"

import { DotsIcon } from "@/components/icons/"
import useOutsideClick from "@/hooks/useOutsideClick"
import { FindNftByMintOutput } from "@metaplex-foundation/js"
import { ParsedXnft } from "@/hooks/useXNFTs"
import { externalResourceUri } from "@coral-xyz/common-public"
import { web3 } from "@project-serum/anchor"

type Props = {
  item: ParsedXnft
  additionalOptions?: React.ReactElement
  onClick?: (item: ParsedXnft) => void
  className?: string
}

const XnftItem = (props: Props) => {
  const { item, additionalOptions = null, className, onClick } = props
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef, () => setIsDropdownActive(false))

  const handleDropdownToggle = () => {
    setIsDropdownActive((previous) => !previous)
  }

  if (!item) return null

  const {
    metadata: {
      data: { uri, name },
    },
    publicKey,
    metadataBlob,
    programAccount,
  } = item

  const handleOnClick = (item: ParsedXnft) => () =>
    onClick ? onClick(item) : true
  const handleKeyDown =
    (item: ParsedXnft) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && e.keyCode == 13) {
        onClick(item)
      }

      return true
    }

  const iconUrl = externalResourceUri(metadataBlob.image)

  return (
    <Flex
      tabIndex={1}
      ref={wrapperRef}
      sx={{
        flexDirection: "column",
        position: "relative",
        transition: "all .125s linear",
        outline: "none",
        cursor: onClick ? "pointer" : "auto",
        padding: ".8rem 0",

        "&:hover, &:focus, > .toggle-menu:focus": {
          "> .toggle-menu": {
            visibility: "visible",
            opacity: 1,
          },

          "> img": {
            opacity: 0.7,
          },
        },
      }}
      className={className}
      onClick={handleOnClick(item)}
      onKeyDown={handleKeyDown(item)}
    >
      <Button
        tabIndex={1}
        variant="resetted"
        className="toggle-menu"
        onClick={handleDropdownToggle}
        sx={{
          display: "flex",
          position: "absolute",
          visibility: isDropdownActive ? "visible" : "hidden",
          opacity: isDropdownActive ? 1 : 0,
          right: ".8rem",
          top: ".8rem",
          zIndex: 1,
          transition: "all .125s linear",

          "&:hover, &:focus": {
            visibility: "visible",
            cursor: "pointer",
            opacity: 1,
          },
        }}
      >
        <DotsIcon
          sx={{
            width: "3.2rem",
            height: "3.2rem",
            stroke: "heading",
            strokeWidth: "2",
          }}
        />
      </Button>
      {/** Dropdown */}
      <Flex
        sx={{
          position: "absolute",
          visibility: isDropdownActive ? "visible" : "hidden",
          opacity: isDropdownActive ? 1 : 0,
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "2.4rem 1.2rem",
          top: 40,
          right: 0,
          backgroundColor: "background",
          transition: "all .125s linear",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          gap: ".8rem",
          zIndex: 2,
          fontSize: "1.2rem",

          a: {
            whiteSpace: "nowrap",
          },
        }}
      >
        <a href={uri} rel="noopener noreferrer" target="_blank" tabIndex={1}>
          View raw JSON
        </a>
        <a
          href={iconUrl}
          rel="noopener noreferrer"
          target="_blank"
          tabIndex={1}
        >
          View image
        </a>
        {additionalOptions || null}
      </Flex>
      <img
        sx={{
          borderRadius: ".4rem",
          transition: "all .125s linear",
          opacity: isDropdownActive ? 0.7 : 1,
        }}
        src={iconUrl}
      />
      <Text
        variant="heading4"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0 .8rem",
          mt: ".8rem",
        }}
      >
        {name}

        {/* <br />
    <a
      href={`https://solscan.io/token/${onchainMetadata.metaData.mint}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {onchainMetadata.metaData.mint}
    </a> */}
      </Text>
      {/* <Text
        variant="small"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0 .8rem",
          mt: ".8rem",
        }}
      >
        Cost: {programAccount.account.installPrice.toNumber() / web3.LAMPORTS_PER_SOL}
      </Text> */}
      <Text
        variant="small"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0 .8rem",
          mt: ".8rem",
        }}
      >
        Installs: {programAccount.account.totalInstalls.toNumber()}
      </Text>
      <Text
        variant="small"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0 .8rem",
          mt: ".8rem",
        }}
      >
        Cost:&nbsp;
        {programAccount.account.installPrice.toNumber() /
          web3.LAMPORTS_PER_SOL}{" "}
        SOL
      </Text>
    </Flex>
  )
}

export default XnftItem

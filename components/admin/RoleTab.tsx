import { Button, VStack, Text, Spinner, useToast, Box } from "@chakra-ui/react";
import { useContract, useAddress, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { MINTER_ROLE } from "../../utils/consts";
import Faucet from "../Faucet";
import { NFT_ABI } from "../../utils/abi";

const RoleTab = () => {
  const [isLoadingReqeust, setIsLoadingRequest] = useState(false);

  const address = useAddress();
  const {
    contract: share,
    isLoading: isLoadingShare,
    error: isErrorShare,
  } = useContract("0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438", "edition-drop");
  const {
    contract: nft,
    isLoading: isLoadingNft,
    error: isErrorNft,
  } = useContract("0xe4fEDd9cca4e4D157452297eDd3A4aF1Ca47e396", NFT_ABI);

  const {
    data: isNftMinter,
    isLoading: isLoadingNftRead,
    error: isErrorNftRead,
  } = useContractRead(nft, "hasRole", MINTER_ROLE, address);

  const {
    data: isShareMinter,
    isLoading: isLoadingShareRead,
    error: isErrorShareRead,
  } = useContractRead(share, "hasRole", MINTER_ROLE, address);

  const toast = useToast();

  const hanldeRequestRoleShare = async () => {
    setIsLoadingRequest(true);
    // GET request to '/api/admin/role/erc1155' with address
    try {
      const response = await fetch(
        `/api/admin/role/erc1155?address=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast({
          title: "Success",
          description: "MINTER ROLE Request Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "MINTER ROLE Request Failed for some reason",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "MINTER ROLE Request Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoadingRequest(false);
  };

  const hanldeRequestRoleNFT = async () => {
    setIsLoadingRequest(true);
    // GET request to '/api/admin/role/erc721' with address
    try {
      const response = await fetch(
        `/api/admin/role/erc721?address=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast({
          title: "Success",
          description: "MINTER ROLE Request Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "MINTER ROLE Request Failed for some reason",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "MINTER ROLE Request Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoadingRequest(false);
  };

  if (
    isLoadingShare ||
    isLoadingNft ||
    isLoadingNftRead ||
    isLoadingShareRead
  ) {
    return <Spinner />;
  }

  if (isErrorShare || isErrorNft || isErrorNftRead || isErrorShareRead) {
    return <Text>Error</Text>;
  }

  return (
    <VStack>
      <Text fontWeight={"bold"}>My Roles</Text>
      <Text>Share(ERC1155) Minter: {isShareMinter ? "true" : "false"}</Text>
      <Text>NFT(ERC721) Minter: {isNftMinter ? "true" : "false"}</Text>

      <Button onClick={hanldeRequestRoleShare} isLoading={isLoadingReqeust}>
        Request MINTER & ADMIN ROLE in Share (ERC1155)
      </Button>
      <Button onClick={hanldeRequestRoleNFT} isLoading={isLoadingReqeust}>
        Request MINTER & ADMIN ROLE in NFT (ERC721)
      </Button>

      <Faucet />
    </VStack>
  );
};

export default RoleTab;

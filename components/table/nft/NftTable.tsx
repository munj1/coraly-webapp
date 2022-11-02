import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { shortenAddress } from "../../../utils/consts";
import { CoralyERC721 } from "../../../utils/types";

export const NftTable = ({ nfts }: { nfts: CoralyERC721[] }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text>id</Text>
                <Text>Name</Text>
              </HStack>
            </HStack>
          </Th>
          <Th>Description</Th>
          <Th>Share address / tokenId</Th>
          <Th>Owner Address</Th>
        </Tr>
      </Thead>
      <Tbody>
        {nfts.map((nft) => (
          <Tr key={nft.id}>
            <Td>
              <HStack spacing="3">
                <Text>{nft.id}</Text>
                <Avatar
                  name={nft?.name}
                  src={nft?.image}
                  boxSize="20"
                  rounded={"none"}
                />
                <Box>
                  <Text fontWeight="medium">{nft?.name}</Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text color="muted">{nft?.description}</Text>
            </Td>
            <Td>
              <Text color="muted">
                {shortenAddress(nft?.shareAddress ?? "")} /{nft?.shareTokenId}
              </Text>
            </Td>
            <Td>
              <Text color="muted">{nft?.owner}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

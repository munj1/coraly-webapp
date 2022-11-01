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
import * as React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import { CoralyERC1155 } from "../../utils/types";

export const ShareTable = ({ shares }: { shares: CoralyERC1155[] }) => (
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
        <Th>Target nft address / tokenId</Th>
        <Th>Total Supply</Th>
        <Th>Set Claiming Condition</Th>
      </Tr>
    </Thead>
    <Tbody>
      {shares.map((share) => (
        <Tr key={share.id}>
          <Td>
            <HStack spacing="3">
              <Text>{share.id}</Text>
              <Avatar
                name={share?.name}
                src={share?.image}
                boxSize="20"
                rounded={"none"}
              />
              <Box>
                <Text fontWeight="medium">{share?.name}</Text>
              </Box>
            </HStack>
          </Td>
          <Td>
            <Text color="muted">{share?.description}</Text>
          </Td>
          <Td>
            <Text color="muted">
              {share?.targetNftAddress} / {share?.targetNftTokenId}
            </Text>
          </Td>
          <Td>
            <Text color="muted">{share?.supply}</Text>
          </Td>
          <Td>
            <HStack spacing="1">
              <IconButton
                icon={<FiEdit2 fontSize="1.25rem" />}
                variant="ghost"
                aria-label="Edit share"
              />
            </HStack>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

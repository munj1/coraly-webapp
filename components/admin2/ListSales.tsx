import {
  Avatar,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { collection, FieldValue } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useContext, useEffect, useState } from "react";
import { Sales } from "../../utils/types";

const ListSales = () => {
  const { db } = useContext(FirebaseContext);
  const [sales, loading, error] = useCollectionData(collection(db, "sales"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState<Sales[]>([]);

  useEffect(() => {
    if (!sales) return;
    const columns = [
      "name",
      "mediaUrl",
      "sellerId",
      "status",
      "erc1155tokenId",
      "erc721tokenId",
    ];

    const data = sales.map((sale) => {
      let tmp = {};
      // if type of value is Date, convert to string. else if type of value is array, convert to string, else if it's object convert to string
      for (const [key, value] of Object.entries(sale)) {
        if (columns.includes(key)) {
          if (typeof value === "boolean") {
            tmp[key] = value ? "true" : "false";
          } else if (value instanceof FieldValue) {
            tmp[key] = value.toString();
          } else if (Array.isArray(value)) {
            tmp[key] = value.toString();
          } else if (typeof value === "object") {
            tmp[key] = JSON.stringify(value);
          } else {
            tmp[key] = value;
          }
        }
      }

      return tmp;
    });
    setData(data as Sales[]);
    setColumns(columns);
  }, [sales]);

  if (loading || !columns || !sales || data?.length < 1 || columns?.length < 1)
    return <Spinner />;
  if (error) return <Text>Error: {error} </Text>;

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of Sales</TableCaption>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item?.erc1155tokenId}>
              {columns.map((column) => (
                <Td key={column}>
                  {column === "mediaUrl" ? (
                    <Avatar src={item[column]} size="xl" />
                  ) : (
                    item[column]
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListSales;

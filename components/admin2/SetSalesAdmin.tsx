import {
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  useToast,
  Image,
  Select,
} from "@chakra-ui/react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { FormEvent, useRef, useState } from "react";
import { ERC1155_ADDRESS, ERC721_ADDRESS } from "../../utils/consts";
import { Sales, SaleStatus } from "../../utils/types";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useContext } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { getDownloadURL, ref as storageRef } from "firebase/storage";

const SetSalesAdmin = () => {
  const { db, storage } = useContext(FirebaseContext);
  const ref = useRef<HTMLFormElement>(null);
  const toast = useToast();

  const firestoreRef = storageRef(storage, "sales");
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [file, setFile] = useState<File>();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData.entries());

    console.log("data", data);

    // upload image to storage
    const firestoreRef = storageRef(
      storage,
      `sales/${(data.erc1155tokenId as string) ?? "temp"}.jpg`
    );

    try {
      let mediaUrl = "";
      if (file) {
        const result = await uploadFile(firestoreRef, file, {
          contentType: "image/jpeg",
        });
        toast({
          title: "Image Upload success",
          description: "Image Upload success",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        mediaUrl = await getDownloadURL(result.ref);
      }

      //
      const saleToUpload: Sales = {
        // id: data.id as string, // auto generate
        name: data.name as string,
        description: data.description as string,
        title: data.title as string,

        erc1155address: data.erc1155address as string,
        erc721address: data.erc721address as string,
        erc1155tokenId: data.erc1155tokenId as string, //id
        erc721tokenId: data.erc721tokenId as string,

        saleStartAt: Timestamp.fromDate(new Date(data.saleStartAt as string)),
        saleEndAt: Timestamp.fromDate(new Date(data.saleEndAt as string)),
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),

        sellerId: data.sellerId as string,
        buyers: [],
        status: data.status as SaleStatus,
        mediaUrl,
      };

      console.log("saleToUpload", saleToUpload);

      await setDoc(
        doc(db, "sales", data.erc1155tokenId as string),
        saleToUpload
      );
      toast({
        title: "Success",
        description: "Sales created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Sales not created",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("error uploading", e);
    }
  };

  const time = new Date();

  return (
    <VStack spacing="3">
      <Text fontWeight={"bold"}>Add New Sales</Text>
      <form ref={ref} onSubmit={handleSubmit}>
        <Text py="3" fontWeight={"extrabold"}>
          Name, Title, Description
        </Text>
        <Input name="name" placeholder="Name of this sale" />
        <Input name="title" placeholder="Title of this sale" />
        <Textarea
          size="xl"
          name="description"
          placeholder="Description of this sale"
        />

        <Text py="3" fontWeight={"extrabold"}>
          Share Info (ERC1155)
        </Text>
        <Input
          name="erc1155address"
          placeholder="ERC1155 Address"
          defaultValue={ERC1155_ADDRESS}
        />
        <Input name="erc1155tokenId" placeholder="ERC1155 Token ID" />

        <Text py="3" fontWeight={"extrabold"}>
          NFT Info (ERC721)
        </Text>
        <Input
          name="erc721address"
          placeholder="ERC721 Address"
          defaultValue={ERC721_ADDRESS}
        />
        <Input name="erc721tokenId" placeholder="ERC721 Token ID" />

        <Text py="3" fontWeight={"extrabold"}>
          sale start, sale end, status, seller
        </Text>
        <Input
          type="datetime-local"
          name="saleStartAt"
          defaultValue={moment(time).format("YYYY-MM-DDTHH:mm")}
        />
        <Input
          type="datetime-local"
          name="saleEndAt"
          defaultValue={moment(time).format("YYYY-MM-DDTHH:mm")}
        />
        <Select placeholder="Select status" name="status">
          <option value="onSale">on sale</option>
          <option value="commingSoon">comming soon</option>
          <option value="soldOut">sold out</option>
        </Select>
        <Input name="sellerId" placeholder="Id of seller" />

        <Text py="3" fontWeight={"extrabold"}>
          Image (optional)
        </Text>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt={"metadata"}
            width="300"
            height="300"
            objectFit="cover"
          />
        )}
        <Input type="file" onChange={handleFile} />
        <Button type="submit" isLoading={uploading}>
          등록
        </Button>
      </form>
      {error && <Text>Error uploading file: {error.message}</Text>}
    </VStack>
  );
};

export default SetSalesAdmin;

import { FieldValue } from "firebase/firestore";
import { BigNumber } from "ethers";

interface CoralyERC1155 {
  id: string;
  name: string;
  description: string;
  image?: string;
  uri?: string;
  targetNftAddress?: string;
  targetNftTokenId?: string;
  supply?: number; // not in a metadata
}

interface CoralyERC721 {
  id: string;
  name: string;
  description: string;
  image?: string;
  uri?: string;
  shareAddress?: string;
  shareTokenId?: string;
  owner?: string;
}

// {
//   owner: '0x0000000000000000000000000000000000000000',
//   metadata: {
//     name: 'Awesome Merge#1',
//     description: 'This is Awesome Merge#1 NFT',
//     image: 'https://gateway.ipfscdn.io/ipfs/QmbAPDwwgWB8EAdH8C3Ysr9PJwWasgzDJgdcfoyNBXYCC1/1.png',
//     id: '1',
//     uri: 'ipfs://QmS3CxcQeu6qqNgpG2sfn17eHcpY2o2ddmhetBLZ2egjcb/1',
//     nftAddress: '0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438',
//     nftTokenId: '1'
//   },
//   type: 'ERC721',
//   supply: 1
// } {
//   owner: '0x0000000000000000000000000000000000000000',
//   metadata: {
//     name: 'Awesome Merge#1 NFT Share Certificate',
//     description: 'This token entitles the holder to a share of the Awesome Merge#1 NFT',
//     image: 'https://gateway.ipfscdn.io/ipfs/QmNUk6uHbi7EE38eyKff7Eh8AKduYkpvppoZriy6V3rE32/1.png',
//     id: '1',
//     uri: 'ipfs://QmcDkmrwFtzEJstXsfJPKgseLepABLdZ5gjoyTynNDHWuP/1',
//     targetNftAddress: '0xd837a8bAADdEc64C4F84bb5321aD1410BcCf8146',
//     targetNftTokenId: '1'
//   },
//   type: 'ERC1155',
//   supply: 0
// }

// share, nft

// [
//   {
//     startTime: "2022-11-02T14:40:00.000Z",
//     currencyAddress: "0xb91cE3b033aA02B92DA9Be3D7264aF58802d476a",
//     price: { type: "BigNumber", hex: "0x056bc75e2d63100000" },
//     maxQuantity: "unlimited",
//     quantityLimitPerTransaction: "unlimited",
//     waitInSeconds: { type: "BigNumber", hex: "0x00" },
//     merkleRootHash:
//       "0x0000000000000000000000000000000000000000000000000000000000000000",
//     availableSupply: "unlimited",
//     currentMintSupply: "0",
//     currencyMetadata: {
//       name: "USDT-by-munj1",
//       symbol: "USDT",
//       decimals: 18,
//       value: { type: "BigNumber", hex: "0x056bc75e2d63100000" },
//       displayValue: "100.0",
//     },
//   },
// ];

interface Condition {
  currencyMetadata: {
    name: string;
    symbol: string;
    decimals?: number;
    value?: BigNumber | number | string;
    displayValue: string;
  };
  currencyAddress?: string;
  startTime?: Date;
  price?: BigNumber;
}

/** DB */
interface Sales {
  id?: string; // == erc1155tokenId
  name: string;
  title: string;
  description?: string;
  mediaUrl?: string;

  erc1155address: string;
  erc1155tokenId: string; // could be used as a id
  erc721address?: string;
  erc721tokenId?: string;

  saleStartAt: FieldValue; //timestamp
  saleEndAt: FieldValue; //timestamp
  createdAt: FieldValue; //timestamp
  updatedAt: FieldValue; //timestamp

  sellerId?: string;
  buyers: string[];
  status?: "onSale" | "soldOut" | "commingSoon";

  amount?: number;
  price?: string;
  currency?: string;
}

type SaleStatus = "onSale" | "soldOut" | "commingSoon";

// interface Users {
//   id: string;
//   photoURL?: string; // upper case
//   displayName?: string;
//   email?: string;
//   instagram?: string;
//   twitter?: string;
//   youtube?: string;

//   myNfts?: { string: number }; // erc1155 tokenId : amount
//   myPurchases?: string[];

//   isAdmin?: boolean;
//   isArtist?: boolean;
//   mySales?: string[];
//   totalHolders?: number;
// }

// interface Transactions {
//   id: string; // auto generate
//   buyerId: string;
//   sellerId?: string;
//   salesId: string;

//   price: number;
//   isFiat: boolean;
//   currency: string;
//   amount: number;
//   purchasedAt: FieldValue; //timestamp
// }

export type {
  Sales,
  // Users,
  // Transactions,
  CoralyERC1155,
  CoralyERC721,
  SaleStatus,
  Condition,
};

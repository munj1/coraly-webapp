import { FieldValue } from "firebase/firestore";

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

interface Sales {
  id: string; // auto generated salesId
  name: string;
  title: string;
  description?: string;

  erc1155address: string;
  erc1155tokenId: string;
  erc721address?: string;
  erc721tokenId?: string;

  isListed: boolean;
  salesStartAt: FieldValue; //timestamp
  salesEndAt: FieldValue; //timestamp
  createdAt: FieldValue; //timestamp

  sellerId?: string;
  buyers: string[];
}

interface Users {
  id: string;
  photoURL?: string; // upper case
  displayName?: string;
  email?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;

  myNfts?: { string: number }; // salesId : amount
  myPurchases?: string[];

  isArtist: boolean;
  mySales?: string[];
  totalHolders?: number;
}

interface Transactions {
  id: string; // auto generate
  buyerId: string;
  sellerId?: string;
  salesId: string;

  price: number;
  isFiat: boolean;
  currency: string;
  amount: number;
  purchasedAt: FieldValue; //timestamp
}

export type { Sales, Users, Transactions, CoralyERC1155, CoralyERC721 };

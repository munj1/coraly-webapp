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

interface CoralyERC721 {}

interface SalesType {
  id: string; //erc1155 tokenId
  name: string;
  erc721address?: string;
  erc721tokenId: string;
  sellerId?: string;

  totalAmount?: number;
  price: number;
  isFiat: boolean;
  currency: string;

  isSold: boolean;
  isListed: boolean;

  salesStartAt: FieldValue; //timestamp
  salesEndAt: FieldValue; //timestamp
  createdAt: FieldValue; //timestamp

  metadataUrl: string;
  metadataType: "image" | "gif" | "video" | "audio" | "document" | "etc";
  bannerUrl?: string;
  description?: string;
  title: string;

  buyers: string[];
}

interface UsersType {
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

interface PurchaseType {
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

export type { SalesType, UsersType, CoralyERC1155, CoralyERC721 };

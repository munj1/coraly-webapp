import { FieldValue } from "firebase/firestore";

interface SalesType {
  id: string; //erc1155 tokenId
  name: string;
  // erc1155Address: string;
  erc721address?: string;
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

export type { SalesType, UsersType };

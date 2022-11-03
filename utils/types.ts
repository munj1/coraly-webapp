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

interface FetchedCoralyERC1155 {
  owner: string;
  metadata: CoralyERC1155;
  type: string;
  supply: number;
}

interface FetchedCoralyERC721 {
  owner: string;
  metadata: CoralyERC721;
  type: string;
  supply: number;
}

interface FetchedCondition {
  startTime: string;
  currencyAddress: string;
  price: BigNumber;
  maxQuantity: string | number | BigNumber;
  quantityLimitPerTransaction: string | number | BigNumber;
  waitInSeconds: BigNumber;
  merkleRootHash: string;
  availableSupply: string;
  currentMintSupply: string;
  currencyMetadata: {
    name: string;
    symbol: string;
    decimals: number;
    value: BigNumber;
    displayValue: string;
  };
}

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
  SaleStatus,
  // Users,
  // Transactions,
  CoralyERC1155,
  CoralyERC721,
  Condition,
  FetchedCoralyERC1155,
  FetchedCoralyERC721,
  FetchedCondition,
};

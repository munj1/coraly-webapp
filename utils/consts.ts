import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

const WETH_ADDRESS = "";
const USDT_ADDRESS = "0xb91cE3b033aA02B92DA9Be3D7264aF58802d476a"; // 내가 만든거임; https://thirdweb.com/mumbai/0xb91cE3b033aA02B92DA9Be3D7264aF58802d476a/
const USDC_ADDRESS = "";
const MINTER_ROLE =
  "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
const DEFAULT_ADMIN_ROLE =
  "0x1effbbff9c66c5e59634f24fe842750c60d18891155c32dd155fc2d661a4c86d";
const ERC1155_ADDRESS = "0x48e4b6dcdb5981d0a17C7E19F8f1a18a6d397438";
const ERC721_ADDRESS = "0xe4fEDd9cca4e4D157452297eDd3A4aF1Ca47e396";

// GET request -> https://api.binance.com/api/v3/ticker/price?symbols=["ETHUSDT","MATICUSDT"]
const getPricesFromBinance = async () => {
  try {
    const response = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbols=[%22ETHUSDT%22,%22MATICUSDT%22]"
    );
    const data = await response.json();
    const ethPrice = parseFloat(data[0].price);
    const maticPrice = parseFloat(data[1].price);
    return { ethPrice, maticPrice };
  } catch (e) {
    console.log("error fetching data from Binance");
    console.log(e);
    return { ethPrice: 0, maticPrice: 0 };
  }
};

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const parseBigNumber = (number: BigNumber) => {
  return parseFloat(formatEther(number)).toString();
};

const calculatePercentage = (input: number, total: number) => {
  if (total === 0) return 100;
  return (input / (total + input)) * 100;
};

const getPercentage = (input: number, total: number) => {
  if (total === 0) return 0;
  return (input / total) * 100;
};

const parseBignuberToNumber = (number: BigNumber) => {
  return parseFloat(formatEther(number));
};

const shortenFloat = (number: number) => {
  return number.toFixed(2);
};

export {
  USDT_ADDRESS,
  ERC1155_ADDRESS,
  ERC721_ADDRESS,
  getPricesFromBinance,
  shortenAddress,
  parseBigNumber,
  parseBignuberToNumber,
  calculatePercentage,
  getPercentage,
  MINTER_ROLE,
};

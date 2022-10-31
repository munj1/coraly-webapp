const WETH_ADDRESS = "";
const USDT_ADDRESS = "0xb91cE3b033aA02B92DA9Be3D7264aF58802d476a"; // 내가 만든거임; https://thirdweb.com/mumbai/0xb91cE3b033aA02B92DA9Be3D7264aF58802d476a/
const USDC_ADDRESS = "";

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

export { USDT_ADDRESS, getPricesFromBinance };

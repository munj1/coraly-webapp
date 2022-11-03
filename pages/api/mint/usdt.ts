import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

dotenv.config();

const mintUsdt = async (req: NextApiRequest, res: NextApiResponse) => {
  // only allow GET requests
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.ADMIN_PRIVATE_KEY,
      "mumbai"
    );
    const contract = await sdk.getContract(
      "0xb91cE3b033aA02B92DA9Be3D7264aF58802d476a",
      "token"
    );

    // get address from request
    const { address } = req.query;
    // if address is a array, get the first element
    const addressToMint = Array.isArray(address) ? address[0] : address;

    const amount = "10000";
    await contract.mintTo(addressToMint, amount);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export default mintUsdt;

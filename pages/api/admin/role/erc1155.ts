import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MINTER_ROLE } from "../../../../utils/consts";

dotenv.config();

const mintUsdt = async (req: NextApiRequest, res: NextApiResponse) => {
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
      "0x9e0D40764763341df8B15647da9D1EDe7040A19c",
      "edition-drop"
    );

    // get address from request
    const { address } = req.query;
    // if address is a array, get the first element
    const addressToGrant = Array.isArray(address) ? address[0] : address;

    await contract.call("grantRole", MINTER_ROLE, addressToGrant);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export default mintUsdt;

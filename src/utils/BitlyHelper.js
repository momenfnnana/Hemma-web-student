import { BitlyClient } from "bitly-react";
const bitly = new BitlyClient("c949a757000d752c183bb382e861fc170628cb97", {});

const BitlyHelper = async (uri) => {
  let result;
  try {
    result = await bitly.shorten(uri);
  } catch (e) {
    throw e;
  }
  return result;
};

export default BitlyHelper;

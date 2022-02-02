import { BitlyClient } from "bitly-react";
const bitly = new BitlyClient("a7e57a0ecaa346f25ae6f28be88e71a1363d6e61", {});

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

import { LoadResponse } from "../types";
import data from "./checkoutData.json";

type checkoutData = {
  success?: boolean;
  response: LoadResponse | string;
};

const getCheckoutData = async (): Promise<checkoutData> => {
  // Faux load delay
  const response = await new Promise((resolve: (value: LoadResponse) => void) =>
    setTimeout(() => resolve(data as LoadResponse), 3000)
  );
  return { success: true, response };
};

export default getCheckoutData;

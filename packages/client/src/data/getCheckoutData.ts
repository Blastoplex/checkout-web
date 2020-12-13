import { ApiData } from "../types";
import data from "./checkoutData.json";

type checkoutData = {
  success?: boolean;
  response: ApiData | string;
};

const getCheckoutData = async (): Promise<checkoutData> => {
  // Faux load delay
  const response = await new Promise((resolve: (value: ApiData) => void) =>
    setTimeout(() => resolve(data as ApiData), 3000)
  );
  return { success: true, response };
};

export default getCheckoutData;

import {
  DiscountedProduct,
  Deal,
  DealType,
  DiscountCalculator,
} from "../types";
import calculateFixedDeal from "./calculateFixedDeal";
import calculateBundleDeal from "./calculateBundleDeal";
import mergeDeals from "./mergeDeals";

// Forces all deals to be handled though does not enforce a type on calculator signature.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dealToCalcMap: Record<DealType, DiscountCalculator<any>> = {
  [DealType.Bundle]: calculateBundleDeal,
  [DealType.Fixed]: calculateFixedDeal,
};

const calculateProductDeal = (
  cart: DiscountedProduct[],
  deals: Deal[] = []
): DiscountedProduct[] => {
  return deals
    .map((deal) => dealToCalcMap[deal.type](cart, deal))
    .reduce(mergeDeals, cart); // Seed with original list to ensure original order.
};

export default calculateProductDeal;

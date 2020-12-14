import {
  DiscountedProduct,
  Deal,
  DealType,
  Product,
  DiscountCalculator
} from "../types";
import calculateFixedDeal from "./calculateFixedDeal";
import calculateBundleDeal from "./calculateBundleDeal";
import mergeDeals from "./mergeDeals";

// Forces all deals to be handled though does not enforce a type on calculator signature.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dealToCalcMap:Record<DealType, DiscountCalculator<any>> = {
  [DealType.Bundle]: calculateBundleDeal,
  [DealType.Fixed]: calculateFixedDeal,
}

const calculateProductDeal = (
  cart: Product[],
  deals: Deal[] = []
): DiscountedProduct[] => {
  const discountedProducts = cart.map((item, index) => ({
    index: index,
    ...item,
    discountedPrice: item.price,
  }));

  const consolidatedDeals = deals
    .map((deal) => dealToCalcMap[deal.type](discountedProducts, deal))
    .reduce(mergeDeals, discountedProducts); // Seed with original list to ensure original order.

  // Strip index
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return consolidatedDeals.map(({ index, ...baseProduct }) => baseProduct);
};

export default calculateProductDeal;

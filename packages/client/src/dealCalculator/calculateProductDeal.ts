import {
  DiscountedProduct,
  Deal,
  DealType,
  Product,
  IndexedDiscountedProduct,
} from "../types";
import calculateFixedDeal from "./calculateFixedDeal";
import calculateBundleDeal from "./calculateBundleDeal";
import mergeDeals from "./mergeDeals";

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
    .reduce<IndexedDiscountedProduct[][]>((acc, deal) => {
      if (deal.type === DealType.Bundle) {
        acc.push(calculateBundleDeal(discountedProducts, deal));
      }
      if (deal.type === DealType.Fixed) {
        acc.push(calculateFixedDeal(discountedProducts, deal));
      }
      return acc;
    }, [])
    .reduce(mergeDeals, discountedProducts); // Seed with original list to ensure original order.

  // Strip index
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return consolidatedDeals.map(({ index, ...baseProduct }) => baseProduct);
};

export default calculateProductDeal;

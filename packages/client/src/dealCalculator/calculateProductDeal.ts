import { DiscountedProduct, Deal, DealType, Product } from "../types";
import calculateBundleDeal from "./calculateBundleDeal";
import calculateFixedDeal from "./calculateFixedDeal"

const calculateProductDeal = (
  cart: Product[],
  deals: Deal[] = []
): DiscountedProduct[] => {
  const discountedCart = cart.map((item) => ({
    ...item,
    discountedPrice: item.price,
  }));

  const updatedCart = deals.reduce((acc, deal) => {
    if (deal.type === DealType.Bundle) {
      return calculateBundleDeal(acc, deal);
    }

    if (deal.type === DealType.Fixed) {
      return calculateFixedDeal(acc, deal);
    }
    return acc;
  }, discountedCart);

  return updatedCart;
};

export default calculateProductDeal;

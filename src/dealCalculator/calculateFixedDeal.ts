import { DiscountCalculator, DealType } from "../types";
import segmentProducts from "./segmentProducts";

const calculateFixedDeal: DiscountCalculator<DealType.Fixed> = (
  discountedProducts,
  deal
) => {
  const {
    terms: { price },
  } = deal;
  const [validProducts, invalidProducts] = segmentProducts(
    discountedProducts,
    deal.productId
  );
  return [
    ...invalidProducts,
    ...validProducts.map((product) => ({
      ...product,
      discountedPrice: price,
    })),
  ];
};

export default calculateFixedDeal;

import { IndexedDiscountedProduct, FixedDeal } from "../types";
import segmentProducts from "./segmentProducts";

const calculateFixedDeal = (
  discountedProducts: IndexedDiscountedProduct[],
  deal: FixedDeal
): IndexedDiscountedProduct[] => {
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

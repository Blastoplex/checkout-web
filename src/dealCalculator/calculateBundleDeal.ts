import {
  BundleDeal,
  DealType,
  DiscountCalculator,
  DiscountedProduct
} from "../types";
import segmentProducts from "./segmentProducts";

const isBundleDealApplicable = (
  validProducts: DiscountedProduct[],
  deal: BundleDeal
) => validProducts.length >= deal.terms.upper;

const isFree = (index: number, upper: number, lower: number) => {
  return index % upper >= lower;
};
const applyBundleDeal: DiscountCalculator<DealType.Bundle> = (
  discountedProducts,
  deal
) => {
  const [validProducts, invalidProducts] = segmentProducts(
    discountedProducts,
    deal.productId
  );

  if (!isBundleDealApplicable(validProducts, deal)) {
    return discountedProducts;
  }

  const {
    terms: { upper, lower },
  } = deal;

  const validProductsWithDealApplied = validProducts.map((product, index) =>
    isFree(index, upper, lower) ? { ...product, discountedPrice: 0.0 } : product
  );

  return [...invalidProducts, ...validProductsWithDealApplied];
};

export default applyBundleDeal;

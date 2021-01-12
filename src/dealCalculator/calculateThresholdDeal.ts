import {
  DealType,
  DiscountCalculator,
  DiscountedProduct,
  ThresholdDeal,
} from "../types";
import segmentProducts from "./segmentProducts";

const isThresholdDealApplicable = (
  validProducts: DiscountedProduct[],
  deal: ThresholdDeal
) => validProducts.length >= deal.terms.threshold;

const calculateThresholdDeal: DiscountCalculator<DealType.Threshold> = (
  discountedProducts,
  deal
) => {
  const [validProducts, invalidProducts] = segmentProducts(
    discountedProducts,
    deal.productId
  );
  console.log('discountedProducts', discountedProducts)
  console.log('deal', deal)
  console.log(isThresholdDealApplicable(validProducts, deal))
  // eslint-disable-next-line no-debugger
  debugger;
  if (!isThresholdDealApplicable(validProducts, deal)) {
    return discountedProducts;
  }


  const validProductsWithDealApplied = validProducts.map((product) => ({
    ...product,
    discountedPrice: deal.terms.price,
  }));

  return [...validProductsWithDealApplied, ...invalidProducts];
};

export default calculateThresholdDeal;

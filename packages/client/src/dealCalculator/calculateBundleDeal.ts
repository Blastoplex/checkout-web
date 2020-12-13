import { BundleDeal, DiscountedProduct } from "../types";

const discountedPriceComparator = (
  a: DiscountedProduct,
  b: DiscountedProduct
) => {
  return a.discountedPrice - b.discountedPrice;
};

const isBundleDealApplicable = (
  deal: BundleDeal,
  discountedProducts: DiscountedProduct[]
) => {
  const {
    productId,
    terms: { upper },
  } = deal;

  const applicableItems = discountedProducts.filter(
    ({ id }) => id === productId
  );

  const length = applicableItems.length;

  return length / upper > 0;
};

const applyBundleDeal = (
    discountedProducts: DiscountedProduct[],
  deal: BundleDeal
): DiscountedProduct[] => {
  if (!isBundleDealApplicable(deal, discountedProducts)) {
    return discountedProducts;
  }

  const {
    productId,
    terms: { upper, lower},
  } = deal;

  const applicableItems: DiscountedProduct[] = [];
  const unapplicableItems: DiscountedProduct[] = [];

  discountedProducts.forEach((product) => {
    if (product.id === productId) {
      applicableItems.push(product);
    } else {
      unapplicableItems.push(product);
    }
  });

  applicableItems.sort(discountedPriceComparator);

  const numberOfTimesDealApplies = Math.floor(applicableItems.length / upper);
  const numberOfFreeItemsPerDealApplicaton = upper - lower;
  const numberOfFreeItems =
    numberOfTimesDealApplies * numberOfFreeItemsPerDealApplicaton;

  const freeItems = applicableItems
    .slice(0, numberOfFreeItems)
    .map((product) => ({ ...product, discountedPrice: 0 }));

  const unchangedItems = applicableItems.slice(numberOfFreeItems);

  const updatedCart = [...unapplicableItems, ...unchangedItems, ...freeItems];

  return updatedCart;
};

export default applyBundleDeal;

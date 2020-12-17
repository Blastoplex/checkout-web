import { DiscountedProduct } from "../types";

const mergeDeals = (
  existingDiscountedProducts: DiscountedProduct[],
  newDiscountedProduct: DiscountedProduct[] = []
): DiscountedProduct[] =>
  existingDiscountedProducts.map((existingDiscountedProduct) => {
    const newProduct = newDiscountedProduct.find(
      (product) => product.entryId == existingDiscountedProduct.entryId
    );

    if (newProduct) {
      return {
        ...existingDiscountedProduct,
        discountedPrice: Math.min(
          existingDiscountedProduct.discountedPrice,
          newProduct.discountedPrice
        ),
      };
    } else {
      return existingDiscountedProduct;
    }
  });

export default mergeDeals;

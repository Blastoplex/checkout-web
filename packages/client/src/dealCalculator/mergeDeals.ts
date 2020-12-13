import { IndexedDiscountedProduct } from "../types";

const mergeDeals = (
  existingDiscountedProducts: IndexedDiscountedProduct[],
  newDiscountedProduct: IndexedDiscountedProduct[] = []
): IndexedDiscountedProduct[] =>
  existingDiscountedProducts.map((existingDiscountedProduct) => {
    const newProduct = newDiscountedProduct.find(
      (product) => product.index == existingDiscountedProduct.index
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

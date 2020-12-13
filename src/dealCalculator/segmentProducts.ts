import { IndexedDiscountedProduct, ProductId } from "../types";

const segmentProducts = (
  discountedProducts: IndexedDiscountedProduct[],
  dealProduct: ProductId
):[IndexedDiscountedProduct[], IndexedDiscountedProduct[]] =>
  discountedProducts.reduce<[IndexedDiscountedProduct[], IndexedDiscountedProduct[]]>(
    (acc, product) => {
      if (product.id === dealProduct) {
        acc[0].push(product);
      } else {
        acc[1].push(product);
      }
      return acc;
    },
    [[], []]
  );

export default segmentProducts;

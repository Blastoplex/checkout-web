import { DiscountedProduct, ProductId } from "../types";

const segmentProducts = (
  discountedProducts: DiscountedProduct[],
  dealProduct: ProductId
):[DiscountedProduct[], DiscountedProduct[]] =>
  discountedProducts.reduce<[DiscountedProduct[], DiscountedProduct[]]>(
    (acc, product) => {
      if (product.productId === dealProduct) {
        acc[0].push(product);
      } else {
        acc[1].push(product);
      }
      return acc;
    },
    [[], []]
  );

export default segmentProducts;

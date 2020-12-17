import { State } from "./types";
import {
  DiscountedProduct,
  DisplayDiscountedProduct,
  DisplayPrice,
  DisplayProduct,
  Product,
  CartItem,
} from "../types";
import calculatePoductDeal from "../dealCalculator/calculateProductDeal";

const priceFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const addDisplayPriceToProduct = (product: Product) => ({
  ...product,
  displayPrice: priceFormatter.format(product.price),
});
const addDisplayPriceToDiscountedProduct = (product: DiscountedProduct) => ({
  ...product,
  displayPrice: priceFormatter.format(product.price),
  displayDiscountedPrice: priceFormatter.format(product.discountedPrice),
});

export const getProductsForDisplay = (state: State): DisplayProduct[] =>
  state.products.map(addDisplayPriceToProduct);

export const getBaseDiscountCartWithProducts = (
  cart: CartItem[],
  products: Product[]
): DiscountedProduct[] => {
  const productsByProductId = products.reduce((mapById, product) => {
    mapById[product.productId] = product;
    return mapById;
  }, {} as { [key: string]: Product });
  return cart.map((cart) => ({
    productId: productsByProductId[cart.productId].productId,
    name: productsByProductId[cart.productId].name,
    description: productsByProductId[cart.productId].description,
    discountedPrice: productsByProductId[cart.productId].price,
    price: productsByProductId[cart.productId].price,
    entryId: cart.entryId,
  }));
};

export const getCartForDisplay = (
  state: State
): [DisplayDiscountedProduct[], DisplayPrice] => {
  const cart = getBaseDiscountCartWithProducts(state.cart, state.products);
  const dealForSelectedCustomer = state.priceDealMap[state.selectedCustomer];
  const discountedCart = calculatePoductDeal(cart, dealForSelectedCustomer).map(
    addDisplayPriceToDiscountedProduct
  );
  const totalPrice = priceFormatter.format(
    discountedCart.reduce((acc, product) => product.discountedPrice + acc, 0)
  );
  return [discountedCart, totalPrice];
};

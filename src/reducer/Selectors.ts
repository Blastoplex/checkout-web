import { State } from "./types";
import {
  DiscountedProduct,
  DisplayDiscountedProduct,
  DisplayPrice,
  DisplayProduct,
  Product,
  ProductId,
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

export const getPopulatedCartWithProducts = (
  cart: ProductId[],
  products: Product[]
): Product[] => {
  return cart
    .map((productId) => products.find((product) => product.id == productId))
    .filter((product) => !!product) as Product[]; //Make sure to filter out any results that cant be found in products.
};

export const getCartForDisplay = (
  state: State
): [DisplayDiscountedProduct[], DisplayPrice] => {
  const cart = getPopulatedCartWithProducts(state.cart, state.products);
  const dealForSelectedCustomer = state.priceDealMap[state.selectedCustomer];
  const discountedCart = calculatePoductDeal(cart, dealForSelectedCustomer).map(
    addDisplayPriceToDiscountedProduct
  );
  const totalPrice = priceFormatter.format(
    discountedCart.reduce((acc, product) => product.discountedPrice + acc, 0)
  );
  return [discountedCart, totalPrice];
};

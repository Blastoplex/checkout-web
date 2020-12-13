import {
  Customer,
  CustomerId,
  Deal,
  LoadResponse,
  Product,
  ProductId,
} from "../types";

export enum ActionTypes {
  unsuccessfullyLoaded = "FAILURE",
  successfullyLoaded = "SUCCESS",
  updateCustomer = "UPDATE_CUSTOMER",
  addProductToCart = "ADD_PRODUCT_TO_CART",
}
export type Action =
  | { type: ActionTypes.unsuccessfullyLoaded; response: string }
  | { type: ActionTypes.successfullyLoaded; response: LoadResponse }
  | { type: ActionTypes.addProductToCart; productId: ProductId }
  | { type: ActionTypes.updateCustomer; customerId: CustomerId };

export interface State {
  cart: ProductId[];
  products: Product[];
  customers: Customer[];
  selectedCustomer: CustomerId;
  loading: boolean;
  priceDealMap: Record<CustomerId, Deal[]>;
}

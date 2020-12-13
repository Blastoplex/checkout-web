import {
  Customer,
  CustomerId,
  Deal,
  ApiData,
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
  | { type: ActionTypes.successfullyLoaded; response: ApiData }
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

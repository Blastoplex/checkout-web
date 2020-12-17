import { Action, ActionTypes, State } from "./types";
import { generate } from "shortid";

export const initialState: State = {
  cart: [],
  products: [],
  customers: [],
  selectedCustomer: "unselected",
  loading: true,
  priceDealMap: {},
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.addProductToCart:
      return {
        ...state,
        cart: [...state.cart, { productId: action.productId, entryId: generate() }],
      };

    case ActionTypes.updateCustomer:
      return {
        ...state,
        selectedCustomer: action.customerId,
      };

    case ActionTypes.successfullyLoaded:
      return {
        ...state,
        products: action.response.products,
        customers: action.response.customers,
        priceDealMap: action.response.priceDealMap,
        loading: false,
      };

    case ActionTypes.unsuccessfullyLoaded:
      console.error(action.response);
      return state;

    default:
      return state;
  }
};

export default reducer;

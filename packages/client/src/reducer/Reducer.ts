import { Action, ActionTypes, State } from "./types";

export const initialState: State = {
  cart: [],
  products: [],
  customers: [],
  selectedCustomer: "",
  loading: true,
  priceDealMap: {},
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.addProductToCart:
      return {
        ...state,
        cart: [...state.cart, action.productId],
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

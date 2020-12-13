import { ApiData, ProductId } from "../../types";
import checkoutData from "../../data/checkoutData.json";
import reducer, { initialState } from "../Reducer";
import { Action, ActionTypes } from "../types";

describe("reducer", () => {
  it("should handle add to product action", () => {
    const action: Action = {
      type: ActionTypes.addProductToCart,
      productId: ProductId.Classic,
    };
    const state = reducer(initialState, action);
    expect(state.cart).toEqual([ProductId.Classic]);
  });
  it("should handle update Customer action", () => {
    const action: Action = {
      type: ActionTypes.updateCustomer,
      customerId: "500",
    };
    const state = reducer(initialState, action);
    expect(state.selectedCustomer).toBe("500");
  });
  it("should handle unsucessfully loaded action", () => {
    const action: Action = {
      type: ActionTypes.unsuccessfullyLoaded,
      response: "error",
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const state = reducer(initialState, action);
    expect(state).toBe(initialState);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
  it("should handle sucessfully loaded action", () => {
    const action: Action = {
      type: ActionTypes.successfullyLoaded,
      response: checkoutData as ApiData,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...state,
      products: checkoutData.products,
      customers: checkoutData.customers,
      priceDealMap: checkoutData.priceDealMap,
      loading: false,
    });
  });
});

import { useReducer, useEffect, useState } from "react";
import reducer, { initialState } from "./reducer/Reducer";
import {
  getCartForDisplay,
  getProductsForDisplay,
} from "./reducer/Selectors";
import getCheckoutData from "./data/getCheckoutData";
import { AppViewProps } from "./AppView";
import {
  CustomerId,
  DisplayDiscountedProduct,
  DisplayPrice,
  DisplayProduct,
  LoadResponse,
  ProductId,
} from "./types";
import { ActionTypes } from "./reducer/types";

const useForm = (): AppViewProps => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [displayProducts, updateDisplayProducts] = useState<DisplayProduct[]>(
    []
  );
  const [displayCart, updateDisplayCart] = useState<DisplayDiscountedProduct[]>(
    []
  );
  const [totalPrice, updateTotalPrice] = useState<DisplayPrice>("");

  const { customers, selectedCustomer, loading } = state;

  useEffect(() => {
    if (!loading) {
      return;
    }

    const getData = async () => {
      const { success, response } = await getCheckoutData();
      if (!success) {
        dispatch({
          type: ActionTypes.unsuccessfullyLoaded,
          response: response as string,
        });
      } else {
        dispatch({
          type: ActionTypes.successfullyLoaded,
          response: response as LoadResponse,
        });
      }
    };
    getData();
  }, [loading]);

  useEffect(() => {
    const [cart, totalPrice] = getCartForDisplay(state);
    updateDisplayCart(cart);
    updateTotalPrice(totalPrice);
    updateDisplayProducts(getProductsForDisplay(state));
  }, [state]);

  const updateCustomer = (customerId: CustomerId) =>
    dispatch({ type: ActionTypes.updateCustomer, customerId });
  const addItemToCart = (productId: ProductId) =>
    dispatch({ type: ActionTypes.addProductToCart, productId });

  return {
    customers,
    selectedCustomer,
    products: displayProducts,
    totalPrice,
    cart: displayCart,
    loading,
    updateCustomer,
    addItemToCart,
  };
};

export default useForm;

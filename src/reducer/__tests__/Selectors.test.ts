import { getProductsForDisplay, getCartForDisplay } from "../Selectors";
import { initialState } from "../Reducer";
import { Deal, DealType, ProductId } from "../../types";

describe("Selectors", () => {
  describe("getProductsForDisplay", () => {
    it("should return products with formatted currency", () => {
      const products = [
        {
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
        },
      ];
      const expected = [
        {
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          displayPrice: "A$20.00",
        },
      ];
      const resultProducts = getProductsForDisplay({
        ...initialState,
        products: products,
      });
      expect(resultProducts).toEqual(expected);
    });
  });
  describe("getCartForDisplay", () => {
    it("should return products with formatted currency and total price", () => {
      const products = [
        {
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
        },
      ];
      const cart = [ProductId.Classic];
      const selectedCustomer = "abc";
      const deal: Deal = {
        type: DealType.Fixed,
        productId: ProductId.Classic,
        terms: {
          price: 10.0,
        },
      };
      const priceDealMap = { [selectedCustomer]: [deal] };
      const expected = [
        {
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          displayPrice: "A$20.00",
          discountedPrice: 10,
          displayDiscountedPrice: "A$10.00",
        },
      ];
      const resultProducts = getCartForDisplay({
        ...initialState,
        selectedCustomer,
        priceDealMap,
        cart,
        products,
      });
      expect(resultProducts[0]).toEqual(expected);
      expect(resultProducts[1]).toEqual("A$10.00");
    });
  });
});

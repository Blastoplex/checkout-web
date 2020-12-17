import { ProductId, DealType, Deal } from "../../types";
import calculateFixedDeal from "../calculateFixedDeal";

describe("calculateFixedDeal", () => {
  const products = [
    {
      entryId: "0",
      productId: ProductId.Classic,
      name: "test_classic_name",
      description: "test_classic_description",
      price: 20.0,
      discountedPrice: 20.0,
    },
    {
      entryId: "1",
      productId: ProductId.Classic,
      name: "test_classic_name",
      description: "test_classic_description",
      price: 20.0,
      discountedPrice: 20.0,
    },
    {
      entryId: "2",
      productId: ProductId.Premium,
      name: "test_premium_name",
      description: "test_premium_description",
      price: 30.0,
      discountedPrice: 30.0,
    },
  ];
  const deal: Deal = {
    type: DealType.Fixed,
    productId: ProductId.Premium,
    terms: {
      price: 10.0,
    },
  };
  describe("given a list of products", () => {
    it("that arent all applicable to deal, should only appliy where valid", () => {
      const expected = [
        {
          entryId: "0",
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          entryId: "1",
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          entryId: "2",
          productId: ProductId.Premium,
          name: "test_premium_name",
          description: "test_premium_description",
          price: 30.0,
          discountedPrice: 10.0,
        },
      ];

      expect(calculateFixedDeal(products, deal)).toEqual(expected);
    });
    it("that are all applicable to deal, should apply to all", () => {
      const expected = [
        {
          entryId: "2",
          productId: ProductId.Premium,
          name: "test_premium_name",
          description: "test_premium_description",
          price: 30.0,
          discountedPrice: 10.0,
        },
      ];

      expect(calculateFixedDeal([products[2]], deal)).toEqual(expected);
    });
    it("and deals that are not valid should do nothing.", () => {
      expect(calculateFixedDeal([products[0], products[1]], deal)).toEqual([
        products[0],
        products[1],
      ]);
    });
  });
});

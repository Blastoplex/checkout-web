import { ProductId, DealType, Deal } from "../../types";
import calculateProductDeal from "../calculateProductDeal";

describe("calculateProductDeal", () => {
  const products = [
    {
      productId: ProductId.Classic,
      name: "test_classic_name",
      description: "test_classic_description",
      price: 20.0,
      discountedPrice: 20,
      entryId: "a",
    },
    {
      productId: ProductId.Classic,
      name: "test_classic_name",
      description: "test_classic_description",
      price: 20.0,
      discountedPrice: 20,
      entryId: "b",
    },
    {
      productId: ProductId.Premium,
      name: "test_premium_name",
      description: "test_premium_description",
      price: 30.0,
      discountedPrice: 30,
      entryId: "c",
    },
  ];
  const notRelevantDeal: Deal[] = [
    {
      type: DealType.Bundle,
      productId: ProductId.Classic,
      terms: {
        upper: 3,
        lower: 2,
      },
    },
  ];
  const deals: Deal[] = [
    {
      type: DealType.Bundle,
      productId: ProductId.Classic,
      terms: {
        upper: 3,
        lower: 2,
      },
    },
    {
      type: DealType.Fixed,
      productId: ProductId.Premium,
      terms: {
        price: 10.0,
      },
    },
  ];
  describe("given a list of products", () => {
    it("and deals that arent all applicable, should only appliy where valid", () => {
      const expected = [
        {
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
          entryId: "a",
        },
        {
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
          entryId: "b",
        },
        {
          productId: ProductId.Premium,
          name: "test_premium_name",
          description: "test_premium_description",
          price: 30.0,
          discountedPrice: 10.0,
          entryId: "c",
        },
      ];

      expect(calculateProductDeal(products, deals)).toEqual(expected);
    });
    it("and deals that are all applicable should apply all deals", () => {
      const expected = [
        {
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
          entryId: "z",
        },
        {
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
          entryId: "a",
        },
        {
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 0.0,
          entryId: "b",
        },
        {
          productId: ProductId.Premium,
          name: "test_premium_name",
          description: "test_premium_description",
          price: 30.0,
          discountedPrice: 10.0,
          entryId: "c",
        },
      ];

      expect(
        calculateProductDeal(
          [{ ...products[0], entryId: "z" }, ...products],
          deals
        )
      ).toEqual(expected);
    });
    it("and deals that are not valid should do nothing.", () => {
      const productsWithDiscount = [
        {
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
          entryId: "a",
        },
        {
          productId: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
          entryId: "b",
        },
        {
          productId: ProductId.Premium,
          name: "test_premium_name",
          description: "test_premium_description",
          price: 30.0,
          discountedPrice: 30.0,
          entryId: "c",
        },
      ];
      expect(calculateProductDeal(products, notRelevantDeal)).toEqual(
        productsWithDiscount
      );
    });
  });
});

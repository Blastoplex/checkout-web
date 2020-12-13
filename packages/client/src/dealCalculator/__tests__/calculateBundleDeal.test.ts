import { ProductId, DealType, Deal } from "../../types";
import calculateBundleDeal from "../calculateBundleDeal";

describe("calculateBundleDeal", () => {
  const products = [
    {
      index: 0,
      id: ProductId.Classic,
      name: "test_classic_name",
      description: "test_classic_description",
      price: 20.0,
      discountedPrice: 20.0,
    },
    {
      index: 1,
      id: ProductId.Classic,
      name: "test_classic_name",
      description: "test_classic_description",
      price: 20.0,
      discountedPrice: 20.0,
    },
    {
      index: 2,
      id: ProductId.Premium,
      name: "test_premium_name",
      description: "test_premium_description",
      price: 30.0,
      discountedPrice: 30.0,
    },
  ];

  const deal: Deal = {
    type: DealType.Bundle,
    productId: ProductId.Classic,
    terms: {
      upper: 3,
      lower: 2,
    },
  };
  describe("given a list of products", () => {
    describe("when deal threshold hasnt been met", () => {
      it("that arent all applicable to deal, should do nothing", () => {
        const expected = [
          {
            index: 0,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 1,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 2,
            id: ProductId.Premium,
            name: "test_premium_name",
            description: "test_premium_description",
            price: 30.0,
            discountedPrice: 30.0,
          },
        ];

        expect(calculateBundleDeal(products, deal)).toEqual(expected);
      });
      it("that are all applicable to deal, should do nothing", () => {
        const expected = [
          {
            index: 0,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 1,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
        ];

        expect(calculateBundleDeal([products[0], products[1]], deal)).toEqual(
          expected
        );
      });
      it("that arent applicable to deal, should do nothing", () => {
        const expected = [
          {
            index: 2,
            id: ProductId.Premium,
            name: "test_premium_name",
            description: "test_premium_description",
            price: 30.0,
            discountedPrice: 30.0,
          },
        ];

        expect(calculateBundleDeal([products[2]], deal)).toEqual(expected);
      });
    });
    describe("when deal threshold has been met", () => {
      const productsInThreshold = [
        {
          index: 0,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 1,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 4,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 2,
          id: ProductId.Premium,
          name: "test_premium_name",
          description: "test_premium_description",
          price: 30.0,
          discountedPrice: 30.0,
        },
      ];
      it("that arent all applicable to deal, should apply where available", () => {
        const expected = [
          {
            index: 2,
            id: ProductId.Premium,
            name: "test_premium_name",
            description: "test_premium_description",
            price: 30.0,
            discountedPrice: 30.0,
          },
          {
            index: 0,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 1,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 4,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 0.0,
          },
        ];

        expect(calculateBundleDeal(productsInThreshold, deal)).toEqual(
          expected
        );
      });
    });
    describe("when deal threshold has been met multiple times", () => {
      const productsInThresholdMultiple = [
        {
          index: 0,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 1,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 4,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 5,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 6,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 7,
          id: ProductId.Classic,
          name: "test_classic_name",
          description: "test_classic_description",
          price: 20.0,
          discountedPrice: 20.0,
        },
        {
          index: 2,
          id: ProductId.Premium,
          name: "test_premium_name",
          description: "test_premium_description",
          price: 30.0,
          discountedPrice: 30.0,
        },
      ];
      it("that arent all applicable to deal, should apply where available", () => {
        const expected = [
          {
            index: 2,
            id: ProductId.Premium,
            name: "test_premium_name",
            description: "test_premium_description",
            price: 30.0,
            discountedPrice: 30.0,
          },
          {
            index: 0,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 1,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 4,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 0.0,
          },
          {
            index: 5,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 6,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 20.0,
          },
          {
            index: 7,
            id: ProductId.Classic,
            name: "test_classic_name",
            description: "test_classic_description",
            price: 20.0,
            discountedPrice: 0.0,
          },
        ];

        expect(calculateBundleDeal(productsInThresholdMultiple, deal)).toEqual(
          expected
        );
      });
    });
  });
});

import { ProductId } from "../../types";
import segmentProducts from "../segmentProducts";

describe("segmentProducts", () => {
  const fixture = [
    {
      id: ProductId.Premium,
      index: 0,
      name: "product_name",
      description: "product_description",
      price: 2.0,
      discountedPrice: 10.0,
    },
    {
      id: ProductId.StandOut,
      index: 1,
      name: "product_name-1",
      description: "product_description-1",
      price: 21.0,
      discountedPrice: 11.0,
    },
    {
      id: ProductId.Premium,
      index: 2,
      name: "product_name-2",
      description: "product_description-2",
      price: 22.0,
      discountedPrice: 12.0,
    },
  ];

  describe("given a list of  discounted products", () => {
    describe("and a productId that exists in the list", () => {
      const existing = ProductId.Premium;
      it("will return a tuple containing a list of all the mathching procducts in the first index", () => {
        const [matching, nonMatching] = segmentProducts(fixture, existing);
        expect(matching).toEqual([fixture[0], fixture[2]]);
      });
      it("will return a tuple containing a list of all the nonmathching procducts in the second index", () => {
        const [matching, nonMatching] = segmentProducts(fixture, existing);
        expect(nonMatching).toEqual([fixture[1]]);
      });
    });
    describe("and a productId that doesnt exists in the list", () => {
      const existing = ProductId.Classic;
      it("will return a tuple containing a list of all the mathching procducts in the first index", () => {
        const [matching, nonMatching] = segmentProducts(fixture, existing);
        expect(matching).toEqual([]);
      });
      it("will return a tuple containing a list of all the nonmathching procducts in the second index", () => {
        const [matching, nonMatching] = segmentProducts(fixture, existing);
        expect(nonMatching).toEqual(fixture);
      });
    });
  });
  describe("given a list of a single type discounted product", () => {
    const singleFixture = [
      {
        id: ProductId.Premium,
        index: 0,
        name: "product_name",
        description: "product_description",
        price: 2.0,
        discountedPrice: 10.0,
      },
      {
        id: ProductId.Premium,
        index: 2,
        name: "product_name-2",
        description: "product_description-2",
        price: 22.0,
        discountedPrice: 12.0,
      },
    ];
    describe("and a productId that exists in the list", () => {
      const existing = ProductId.Premium;
      it("will return a tuple containing a list of all the mathching procducts in the first index", () => {
        const [matching, nonMatching] = segmentProducts(singleFixture, existing);
        expect(matching).toEqual(singleFixture);
      });
      it("will return a tuple containing a list of all the nonmathching procducts in the second index", () => {
        const [matching, nonMatching] = segmentProducts(singleFixture, existing);
        expect(nonMatching).toEqual([]);
      });
    });
  });
  describe("given a empty list", () => {
    describe("and a productId that exists in the list", () => {
      const productId = ProductId.Premium;
      it("will return a empty tuple", () => {
        const actual= segmentProducts([], productId);
        expect(actual).toEqual([]);
      });
    });
  });
});

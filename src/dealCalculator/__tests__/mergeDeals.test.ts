import { ProductId } from "../../types";
import mergeDeals from "../mergeDeals";

describe("mergeDeals", () => {
  const fixture = [
    {
      productId: ProductId.Premium,
      entryId: '0',
      name: "product_name",
      description: "product_description",
      price: 2.0,
      discountedPrice: 10.0,
    },
    {
      productId: ProductId.Premium,
      entryId: '1',
      name: "product_name-1",
      description: "product_description-1",
      price: 21.0,
      discountedPrice: 11.0,
    },
    {
      productId: ProductId.Premium,
      entryId: '2',
      name: "product_name-2",
      description: "product_description-2",
      price: 22.0,
      discountedPrice: 12.0,
    },
  ];
  describe("given a list of indexed discounted products", () => {
    it("will return the same list of discounted products", () => {
      const returnedDiscountedProducts = mergeDeals(fixture, []);
      expect(returnedDiscountedProducts).toEqual(fixture);
    });
    describe("and a new list of discounted products", () => {
      describe("will combine products with matching indexes discounted price", () => {
        it("when new disounted price is smaller will take new", () => {
          const mergeProduct = {
            productId: ProductId.Premium,
            entryId: '2',
            name: "product_name-2",
            description: "product_description-2",
            price: 22.0,
            discountedPrice: 10.0,
          };

          const expected = [
            fixture[0],
            fixture[1],
            { ...fixture[2], discountedPrice: mergeProduct.discountedPrice },
          ];
          const returnedDiscountedProducts = mergeDeals(fixture, [
            mergeProduct,
          ]);
          expect(returnedDiscountedProducts).toEqual(expected);
        });
        it("when new disounted price is larger will retain older", () => {
          const mergeProduct = {
            productId: ProductId.Premium,
            entryId: '2',
            name: "product_name-2",
            description: "product_description-2",
            price: 22.0,
            discountedPrice: 60.0,
          };

          const expected = [fixture[0], fixture[1], fixture[2]];
          const returnedDiscountedProducts = mergeDeals(fixture, [
            mergeProduct,
          ]);
          expect(returnedDiscountedProducts).toEqual(expected);
        });
      });
      it("with the same index will not not merge keys other than discountedPrice", () => {
        const mergeProduct = {
          productId: ProductId.StandOut,
          entryId: '2',
          name: "test-data",
          description: "more-data",
          price: 500.0,
          discountedPrice: 10.0,
        };

        const expected = [
          fixture[0],
          fixture[1],
          { ...fixture[2], discountedPrice: mergeProduct.discountedPrice },
        ];
        const returnedDiscountedProducts = mergeDeals(fixture, [mergeProduct]);
        expect(returnedDiscountedProducts).toEqual(expected);
      });
      it("without the same index will have no effect", () => {
        const mergeProduct = {
          productId: ProductId.StandOut,
          entryId: '80',
          name: "test-data",
          description: "more-data",
          price: 500.0,
          discountedPrice: 10.0,
        };

        const expected = [
          fixture[0],
          fixture[1],
          fixture[2],
        ];
        const returnedDiscountedProducts = mergeDeals(fixture, [mergeProduct]);
        expect(returnedDiscountedProducts).toEqual(expected);
      });
    });
  });
});

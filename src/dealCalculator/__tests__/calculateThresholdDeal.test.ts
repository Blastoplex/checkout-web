import { Deal, DealType, ProductId } from "../../types";
import calculateThresholdDeal from "../calculateThresholdDeal";

const first = {
  entryId: "0",
  productId: ProductId.Classic,
  name: "test_classic_name",
  description: "test_classic_description",
  price: 20.0,
  discountedPrice: 20.0,
};
const second = {
  entryId: "1",
  productId: ProductId.Classic,
  name: "test_classic_name",
  description: "test_classic_description",
  price: 20.0,
  discountedPrice: 20.0,
};
const third = {
  entryId: "2",
  productId: ProductId.Classic,
  name: "test_classic_name",
  description: "test_classic_description",
  price: 20.0,
  discountedPrice: 20.0,
};
const notRelevantDeal = {
  entryId: "2",
  productId: ProductId.Premium,
  name: "test_classic_name",
  description: "test_classic_description",
  price: 20.0,
  discountedPrice: 20.0,
};
const deal: Deal = {
  type: DealType.Threshold,
  productId: ProductId.Classic,
  terms: {
    threshold: 2,
    price: 10.0,
  },
};

describe("calculateThresholdDeal", () => {
  it("should not apply discount when threshold is not met", () => {
    const products = [first];
    const actual = calculateThresholdDeal(products, deal);
    expect(actual).toEqual(products);
  });
  it("should apply discount when threshold is met exaclty", () => {
    const products = [first, second];
    const expected = [
      { ...first, discountedPrice: deal.terms.price },
      { ...second, discountedPrice: deal.terms.price },
    ];
    const actual = calculateThresholdDeal(products, deal);
    expect(actual).toEqual(expected);
  });
    it("should apply discount when threshold is over met", () => {
        const products = [first, second, third];
        const expected = [
          { ...first, discountedPrice: deal.terms.price },
          { ...second, discountedPrice: deal.terms.price },
          { ...third, discountedPrice: deal.terms.price },
        ];
        const actual = calculateThresholdDeal(products, deal);
        expect(actual).toEqual(expected);
    });
    it("should apply discount when threshold is met and notRelevantDeal", () => {
        const products = [first, second, third, notRelevantDeal];
        const expected = [
          { ...first, discountedPrice: deal.terms.price },
          { ...second, discountedPrice: deal.terms.price },
          { ...third, discountedPrice: deal.terms.price },
          notRelevantDeal,
        ];
        const actual = calculateThresholdDeal(products, deal);
        expect(actual).toEqual(expected);
    });
});

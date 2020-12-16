/**
 * Customers
 */

export type CustomerId = string;

export type Customer = {
  id: CustomerId;
  name: string;
};

/**
 * Products
 */

export type DisplayPrice = string;

export type Price = number;

export enum ProductId {
  Classic = "CLASSIC",
  StandOut = "STAND_OUT",
  Premium = "PREMIUM",
}

export interface Product {
  id: ProductId;
  name: string;
  description: string;
  price: Price;
}

export type DisplayProduct = Product & {
  displayPrice: DisplayPrice;
};

export type DiscountedProduct = Product & {
  discountedPrice: Price;
};

export type IndexedDiscountedProduct = DiscountedProduct & {
  index: number;
};

export type DisplayDiscountedProduct = DiscountedProduct & {
  displayPrice: DisplayPrice;
  displayDiscountedPrice: DisplayPrice;
};

/**
 * Deals
 */

export enum DealType {
  Bundle = "BUNDLE",
  Fixed = "FIXED",
}

export interface BundleDeal {
  type: DealType.Bundle;
  productId: ProductId;
  terms: {
    upper: number;
    lower: number;
  };
}

export interface FixedDeal {
  type: DealType.Fixed;
  productId: ProductId;
  terms: {
    price: number;
  };
}

export type Deal = BundleDeal | FixedDeal;

export interface ApiData {
  products: Product[];
  customers: Customer[];
  priceDealMap: Record<CustomerId, Deal[]>;
}

export type DealTypeToDealMap = {
  [DealType.Bundle]: BundleDeal
  [DealType.Fixed]: FixedDeal
}

export type DiscountCalculator<T extends keyof DealTypeToDealMap> = (
  discountedProducts: IndexedDiscountedProduct[],
  deal: DealTypeToDealMap[T]
) => IndexedDiscountedProduct[];

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
  productId: ProductId;
  name: string;
  description: string;
  price: Price;
}

export type CartItem = {
  productId: ProductId,
  entryId: string
}

export type DisplayProduct = Product & {
  displayPrice: DisplayPrice;
};

export type DiscountedProduct = Product & {
  entryId: string
  discountedPrice: Price;
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
  Threshold = "THRESHOLD",
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

export interface ThresholdDeal {
  type: DealType.Threshold;
  productId: ProductId;
  terms: {
    threshold: number;
    price: number;
  };
}


export type Deal = BundleDeal | FixedDeal | ThresholdDeal;

export interface ApiData {
  products: Product[];
  customers: Customer[];
  priceDealMap: Record<CustomerId, Deal[]>;
}

export type DealTypeToDealMap = {
  [DealType.Bundle]: BundleDeal
  [DealType.Fixed]: FixedDeal
  [DealType.Threshold]: ThresholdDeal
}

export type DiscountCalculator<T extends keyof DealTypeToDealMap> = (
  discountedProducts: DiscountedProduct[],
  deal: DealTypeToDealMap[T]
) => DiscountedProduct[];

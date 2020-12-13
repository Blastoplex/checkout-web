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
  classic = "CLASSIC",
  standOut = "STAND_OUT",
  premium = "PREMIUM",
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

export type DisplayDiscountedProduct = DisplayProduct & {
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

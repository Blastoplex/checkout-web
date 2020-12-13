import React from "react";
import {
  Customer,
  CustomerId,
  DisplayProduct,
  ProductId,
  DisplayDiscountedProduct,
  DisplayPrice,
} from "./types";

export type AppViewProps = {
  customers: Customer[];
  selectedCustomer: CustomerId;
  products: DisplayProduct[];
  totalPrice: DisplayPrice;
  cart: DisplayDiscountedProduct[];
  loading: boolean;
  updateCustomer: (arg0: CustomerId) => void;
  addItemToCart: (arg0: ProductId) => void;
};

const AppView: React.FC<AppViewProps> = (props: AppViewProps) => {
  return (
    <div>
      <h1>Job ad checkout</h1>
      <label htmlFor="customer-select">Customer</label>
      <select
        id="customer-select"
        value={props.selectedCustomer}
        defaultValue={"unselected"}
        onChange={(e) => props.updateCustomer(e.target.value)}
      >
        <option value="unselected" label={"No customer selected"} hidden>
          No customer selected
        </option>
        {props.customers.map((customer) => (
          <option key={customer.id} value={customer.id} label={customer.name}>
            {customer.name}
          </option>
        ))}
      </select>
      <h2>Products</h2>
      {props.products.map((product) => (
        <div key={product.id}>
          {JSON.stringify(product)}
          <button onClick={() => props.addItemToCart(product.id)}>
            Add to cart
          </button>
        </div>
      ))}
      <h2>Cart</h2>
      {props.cart.map((product) => (
        <div key={product.id}>{JSON.stringify(product)}</div>
      ))}
      <div> Total: {props.totalPrice}</div>
    </div>
  );
};

export default AppView;

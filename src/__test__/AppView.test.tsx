/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppView, { AppViewProps } from "../AppView";
import { ProductId } from "../types";

describe("AppView", () => {
  describe("when loading", () => {
    it("Should render header", () => {
      const viewProps: AppViewProps = {
        customers: [],
        products: [],
        cart: [],
        selectedCustomer: "",
        totalPrice: "",
        loading: true,
        updateCustomer: () => {},
        addItemToCart: () => {},
      };
      render(<AppView {...viewProps} />);
      const linkElement = screen.getByText("Job Ad checkout");
      expect(linkElement).toBeInTheDocument();
    });
    it("Should render a select with 3 options", () => {
      const viewProps: AppViewProps = {
        customers: [],
        products: [],
        cart: [],
        selectedCustomer: "",
        totalPrice: "",
        loading: true,
        updateCustomer: () => {},
        addItemToCart: () => {},
      };
      render(<AppView {...viewProps} />);
      fireEvent.keyDown(screen.getAllByRole("button")[0], {
        key: "ArrowDown",
        code: "ArrowDown",
      });
      const selectList = screen.getAllByRole("option");
      expect(selectList.length).toBe(3);
    });
  });
  describe("when not loading", () => {
    describe("cart", () => {
      it("Should render header", () => {
        const viewProps: AppViewProps = {
          customers: [],
          products: [],
          cart: [
            {
              entryId: "a",
              productId: ProductId.Classic,
              name: "Classic",
              description: "A classic ad",
              price: 50,
              displayPrice: "$50",
              discountedPrice: 25,
              displayDiscountedPrice: "$25",
            },
          ],
          selectedCustomer: "",
          totalPrice: "",
          loading: false,
          updateCustomer: () => {},
          addItemToCart: () => {},
        };
        render(<AppView {...viewProps} />);
        const header = screen.getByText("Cart");
        expect(header).toBeInTheDocument();
      });
      it("Should render a table with content", () => {
        const viewProps: AppViewProps = {
          customers: [],
          products: [],
          cart: [
            {
              entryId: "a",
              productId: ProductId.Classic,
              name: "Classic",
              description: "A classic ad",
              price: 50,
              displayPrice: "$50",
              discountedPrice: 25,
              displayDiscountedPrice: "$25",
            },
          ],
          selectedCustomer: "",
          totalPrice: "",
          loading: false,
          updateCustomer: () => {},
          addItemToCart: () => {},
        };
        render(<AppView {...viewProps} />);
        const table = screen.getByRole("table", { name: "Job cart table" });
        expect(table).toBeInTheDocument();
        expect(
          screen.getByRole("rowgroup", { name: "Job cart table header" })
        ).toBeInTheDocument();
        expect(table).toBeInTheDocument();
        expect(screen.getAllByRole("row")[2].textContent).toBe("Classic$50$25");
      });
    });
  });
  describe("products", () => {
    it("Should render header", () => {
      const viewProps: AppViewProps = {
        customers: [],
        products: [
          {
            productId: ProductId.Classic,
            name: "Classic",
            description: "A classic ad",
            price: 50,
            displayPrice: "$50",
          },
        ],
        cart: [],
        selectedCustomer: "",
        totalPrice: "",
        loading: false,
        updateCustomer: () => {},
        addItemToCart: () => {},
      };
      render(<AppView {...viewProps} />);
      const header = screen.getByText("Products");
      expect(header).toBeInTheDocument();
    });
    it("Should render a table with content", () => {
      const viewProps: AppViewProps = {
        customers: [],
        products: [
          {
            productId: ProductId.Classic,
            name: "Classic",
            description: "A classic ad",
            price: 50,
            displayPrice: "$50",
          },
        ],
        cart: [],
        selectedCustomer: "",
        totalPrice: "",
        loading: false,
        updateCustomer: () => {},
        addItemToCart: () => {},
      };
      render(<AppView {...viewProps} />);
      const table = screen.getByRole("table", { name: "Job ad table" });
      expect(table).toBeInTheDocument();
      expect(
        screen.getByRole("rowgroup", { name: "Job ad table header" })
      ).toBeInTheDocument();
      expect(table).toBeInTheDocument();
      expect(screen.getAllByRole("row")[1].textContent).toBe(
        "ClassicA classic ad$50Add to cart"
      );
    });
  });
});

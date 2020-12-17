import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

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
    <Container>
      <Box marginY={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Job Ad checkout
        </Typography>
        <Card>
          <CardContent>
            <Box marginBottom={4}>
              <TextField
                id="select"
                label="Customer"
                onChange={(e) => props.updateCustomer(e.target.value)}
                value={props.selectedCustomer}
                select
              >
                <MenuItem value="unselected">No customer selected</MenuItem>
                {props.loading
                  ? [
                      <MenuItem key="first">
                        <Box width="100%">
                          <Skeleton />
                        </Box>
                      </MenuItem>,
                      <MenuItem key="second">
                        <Box width="100%">
                          <Skeleton />
                        </Box>
                      </MenuItem>,
                    ]
                  : props.customers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    ))}
              </TextField>
            </Box>
            <Box marginBottom={4}>
              <Typography variant="h4" component="h2" gutterBottom>
                Products
              </Typography>
              <TableContainer>
                <Table aria-label="Job ad table">
                  <TableHead aria-label="Job ad table header">
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.loading ? (
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell align="right">
                          <Button disabled>Add to cart</Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      props.products.map((product) => (
                        <TableRow key={`add-${product.productId}`}>
                          <TableCell>
                            <strong>{product.name}</strong>
                          </TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.displayPrice}</TableCell>
                          <TableCell align="right">
                            <Button
                              color="primary"
                              onClick={() => props.addItemToCart(product.productId)}
                            >
                              Add to cart
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {props.cart.length > 0 && (
              <Box marginBottom={4}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Cart
                </Typography>
                <TableContainer>
                  <Table aria-label="Job cart table">
                    <TableHead aria-label="Job cart table header">
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Discounted price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.cart.map((entry) => (
                        <TableRow key={`cart-${entry.entryId}`}>
                          <TableCell>
                            <strong>{entry.name}</strong>
                          </TableCell>
                          <TableCell>{entry.displayPrice}</TableCell>
                          <TableCell>
                            {entry.displayDiscountedPrice}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            <Typography variant="h5" gutterBottom>
              Total Price: {props.totalPrice}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AppView;

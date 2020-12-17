# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Assumptions

 - In this context theres a design system that is responsible for rendering the view layer. Through this lense I have made my view as simple as possible. (I have added a loading state, because I like the skeleton component but really that could be refactored out also.). As the view code is owned by a seperate system theres no need to test the system, mostly just where my content appears on the page. 
 - In an ideal world the selection of the customer would be through user acess and privelages, in this case we are acting as a user that can checkout as any customer. 
 - Peferably the computation of the discounts on the cart and would be managed server side, this would ensure the correctness and consistency of the computation as the computation would also be used in the backend to either validate the purchace or recalculate it.
 - Potentially there will be more deal types and more products
 - Deals can only apply discounts to indiviual items in the cart eg - A deal that applies a fixed discount after breaching a total price of x will need a little bit of work in the `mergeDeals.ts` file.
 - Checkout data will be aquired through an API call which is why `getCheckoutData.ts` is returning a promise
 - Its not necesary to have a remove from cart button. Though this can be added.  
 - A deal will only ever change the price of a product. Eg there wont be a case where buying an item at 10% discount with generate customer loyalty points

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

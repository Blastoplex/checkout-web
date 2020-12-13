import React from "react";
import "./App.css";
import useCheckout from "./useCheckout";
import AppView from './AppView'


const App: React.FC = () => {
  return (
    <AppView
      {...useCheckout()}
    />
  );
};

export default App;

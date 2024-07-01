import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import Payments from "./components/Payments";
import Paywall from "./components/Paywall";

ReactDOM.render(
  <TransactionsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/deposit" element={<Payments />}></Route>
        <Route path="/" element={<App />}></Route>
        <Route path="/paywall" element={<Paywall />}></Route>
      </Routes>
    </BrowserRouter>
  </TransactionsProvider>,
  document.getElementById("root")
);

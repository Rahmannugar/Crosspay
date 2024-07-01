import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Paywall = () => {
  const location = useLocation();
  const { firstName, lastName, depositBalance } = location.state || {};
  return (
    <div className="mt-5 px-5">
      <h1 className="font-black text-xl sm:text-3xl">
        Dear {firstName} {lastName},
      </h1>
      <span className="font-semibold">
        your deposit of {depositBalance} was successful, pls go back to the
        homepage to continue your activity.
      </span>

      <a href="/">
        <button id="btn">Your dashboard</button>
      </a>
    </div>
  );
};

export default Paywall;

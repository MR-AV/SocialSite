import React, { useState } from "react";
import App from "./App";
import Cart from "./Cart";

function Render() {
  const [state, setState] = useState(0);

  function handleRoot() {
    setState(1);
  }
  if (state === 0) return <App changeRoot={handleRoot} />;
  else return <Cart />;
}

export default Render;

import React from "react";
import MyNav from "../navbar/navbar";

const Cart = function(props) {
  return (
    <div>
      <MyNav user={props.user} />
      <div>Inside Cart</div>
    </div>
  );
};

export default Cart;

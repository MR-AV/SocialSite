import React, { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StoreIcon from "@material-ui/icons/Store";
import { Card, ButtonGroup, Button } from "react-bootstrap";
// import Cart from "./Cart";

const Item = function(props) {
  const [state, setState] = useState(false);

  function handleChange() {
    setState(!state);
  }

  return (
    <Card
      border="warning"
      // onMouseOver={handleChange}
      // onMouseOut={handleChange}
      style={{
        margin: "20px",
        width: "18rem"
      }}
    >
      <Card.Header>{props.caption}</Card.Header>
      <Card.Img
        //style={{ width: "100%", height: "auto" }}
        variant="top"
        src={props.src}
        alt="comp"
      />
      <Card.Body>
        <h2>
          <span>Details of the laptop</span>
        </h2>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="primary"
            onClick={
              state === false
                ? () => {
                    props.addToCart();
                    handleChange();
                  }
                : () => {
                    // location.href = "Cart.js";
                    props.changeRoot();
                  }
            }
          >
            <AddShoppingCartIcon /> Add To Cart
          </Button>
          <Button variant="secondary">
            <StoreIcon /> Buy Now
          </Button>
        </ButtonGroup>

        {/* <MyButton variant="primary">
          Add To Cart <AddShoppingCartIcon />
        </MyButton>

        <MyButton variant="secondary">
          Buy Now <StoreIcon />
        </MyButton> */}
      </Card.Body>
    </Card>
  );
};

export default Item;

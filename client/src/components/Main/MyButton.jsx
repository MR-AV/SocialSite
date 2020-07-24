import React from "react";
import { Button } from "react-bootstrap";

export default function MyButton(props) {
  return (
    <Button variant={props.variant} className="mx-1">
      {props.children}
    </Button>
  );
}

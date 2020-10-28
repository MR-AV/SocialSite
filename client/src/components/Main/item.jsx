import React, { useState, useRef } from "react";
import Likes from '@material-ui/icons/ThumbUpAlt';
import Comments from '@material-ui/icons/ChatBubble';
import { Card, ButtonGroup, Button } from "react-bootstrap";
// import Cart from "./Cart";
let change = 1
const Item = function(props) {
  
  const likeRef = useRef(null)
  function handleChange(){
    //axios call

    axios.post("/postLikes", {
      userId : props.userId,
      imageId : props.imageId
    },{withCrdentials: true})
     let x = Number(likeRef.current.innerText)
     x += change
     change = (-1)*change
    //  x++;
    //  console.log(x)
    likeRef.current.innerText = x
    //console.log(likeRef.current.innerText)
  }

  return ( 
    <Card
      border="warning"
      style={{
        margin: "20px",
        width: "18rem"
      }}
    >
      <Card.Header>{props.caption}</Card.Header>
      <Card.Img
        variant="top"
        src={props.src}
        alt="comp"
      />
      <Card.Body>Likes <span ref = {likeRef}>{props.likes}</span></Card.Body>
      <Card.Footer>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick = {handleChange} >

            <Likes/> Like
          </Button>
          <Button variant="secondary">
            <Comments /> Comments
          </Button>
        </ButtonGroup>
      </Card.Footer>

    </Card>
  );
};

export default Item;

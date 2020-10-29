import React, { useState, useRef } from "react";
import Likes from '@material-ui/icons/ThumbUpAlt';
import Comments from '@material-ui/icons/ChatBubble';
import { Card, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios"
import { ENDPOINT } from "../utils";
// import Cart from "./Cart";
let change = 1
const Item = function(props) {
  
  const likeRef = useRef(null)
  function handleChange(){
    axios(
    {

      method : 'post',
      url : "/postLikes",
      data : JSON.stringify({
        userId : props.userId,
        imageId : props.imageId
      }),
      headers: {'Content-Type': 'application/json' },
      // data: bodyFormData,
      // headers: {'Content-Type': 'multipart/form-data' },
      withCrdentials: true
    })
    .then((res) => {
      console.log("res = ", res)
      likeRef.current.innerText = res.data.len})
      .catch(err => {
        console.log("err = ",err)
      })
    
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
      {/* <span >userid = {props.userId}</span> */}
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

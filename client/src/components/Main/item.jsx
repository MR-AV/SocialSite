import React, { useState, useRef } from "react";
import Likes from '@material-ui/icons/ThumbUpAlt';
import Comments from '@material-ui/icons/ChatBubble';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Card, ButtonGroup, Button } from "react-bootstrap";
// import Cart from "./Cart";
let change = 1
const Item = function(props) {
  const commentboxref=useRef(null)
  function addcommentbox(){
    commentboxref.current.classList.toggle("a");
  
  }

  const likeRef = useRef(null)
  function handleChange(){
    //axios call
     let x = Number(likeRef.current.innerText)
     x += change
     change = (-1)*change
    //  x++;
    //  console.log(x)
    likeRef.current.innerText = x
    //console.log(likeRef.current.innerText)
  }

  return ( 
    <div >
    <Card style={{
      width: "500px",
      border:"2px solid red",
      height:"500px",
      margin:"auto"
    }}>
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
          <Button variant="secondary" onClick={addcommentbox}>
            <AddCommentIcon  /> Add Comment
          </Button>
        </ButtonGroup>
        <textarea placeholder="Write your comment" className="b"  ref={commentboxref} width="400px"></textarea>
      </Card.Footer>          
      
    </Card>
    </div>
  );
};

export default Item;

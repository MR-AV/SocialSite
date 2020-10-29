import React, { useState, useRef } from "react";
import Likes from '@material-ui/icons/ThumbUpAlt';
import Comments from '@material-ui/icons/ChatBubble';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Card, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios"
import { ENDPOINT } from "../utils";
// import Cart from "./Cart";
let change = 1
const Item = function(props) {
  const commentboxref=useRef(null)
  function addcommentbox(){
    commentboxref.current.classList.toggle("a");
  
  }

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
    <div >
    <Card style={{
      width: "500px",
      border:"2px solid red",
      height:"auto",
      margin:"auto",
      marginBottom : "20px"
    }}>
      <Card.Header>{props.caption}</Card.Header>
      {/* <span >userid = {props.userId}</span> */}
      <Card.Img
        variant="top"
        src={props.src}
        alt="comp"
      />
      {/* <Card.Body>Likes <span ref = {likeRef}>{props.likes}</span></Card.Body> */}
      <Card.Footer>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick = {handleChange} >

            <Likes/> Likes <span ref = {likeRef}>{props.likes}</span>
          </Button>
          <Button variant="secondary">
            <Comments /> Comments {props.comments}
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

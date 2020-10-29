import React, { useState, useRef } from "react";
import Likes from '@material-ui/icons/ThumbUpAlt';
import Comments from '@material-ui/icons/ChatBubble';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Card, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios"
import { ENDPOINT } from "../utils";
import './styles.css'
// import Cart from "./Cart";
import Comment from './Comment';
let change = 1
const Item = function(props) {
  const addcommentboxref=useRef(null)
  function addcommentbox(){
    addcommentboxref.current.classList.toggle("addcommentdiv");
  
  }

  const viewcommentsRef=useRef(null)
  function viewcomments(){
    // console.log('hi');
    // console.log(viewcommentsref.current);
  viewcommentsRef.current.classList.toggle("commentdiv");
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
          <Button variant="secondary" onClick={viewcomments}>
            <Comments /> Comments {props.comments}
          </Button>
          <Button variant="secondary" onClick={addcommentbox}>
            <AddCommentIcon  /> Add Comment
          </Button>
        </ButtonGroup>
        <div className="nodisplay"  ref={addcommentboxref} >
        <textarea placeholder="Write your comment"  width="400px"></textarea>
        <button style={{height:"40px"}}>Post</button>
        </div>
        <div className="nodisplay" ref={viewcommentsRef} >
        <Comment viewcommentsRef={viewcommentsRef}/>
        </div>
      </Card.Footer>          
      
    </Card>
    </div>
  );
};

export default Item;

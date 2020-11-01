import React, { useState, useRef } from "react";
import Likes from '@material-ui/icons/ThumbUpAlt';
import Comments from '@material-ui/icons/ChatBubble';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Card, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios"
import UserProfile from '@material-ui/icons/AccountCircle';
import { ENDPOINT } from "../utils";
import './styles.css'

// import Cart from "./Cart";
import Comment from './Comment';
let change = 1
const Item = function(props) {
  const addcommentboxref= useRef(null)
  const viewcommentsRef = useRef(null)
  const commentRef      = useRef(null)
  const commentCountRef = useRef(null)
  const likeRef = useRef(null)
  const [comments, setComments] = useState([]);
  const setUserNameRef = useRef(null)

  function addcommentbox(){
    addcommentboxref.current.classList.toggle("addcommentdiv");
  }
  function viewcomments(){

  viewcommentsRef.current.classList.toggle("commentdiv");
  axios(
    {

      method : 'post',
      url : "/image/Comment/getComments",
      data : JSON.stringify({
        userId : props.userId,
        imageId : props.imageId,
      }),
      headers: {'Content-Type': 'application/json' },
      withCrdentials: true
    })
  .then( (res) => {
    console.log(res.data);
    setComments(res.data.comments);
  }).catch((err) => console.log("errInGettingComments = ",err));
  }

  function handleChange(){
    axios(
    {

      method : 'post',
      url : "/image/postLikes",
      data : JSON.stringify({
        userId : props.userId,
        imageId : props.imageId
      }),
      headers: {'Content-Type': 'application/json' },
      withCrdentials: true
    })
    .then((res) => {
      console.log("res = ", res)
      likeRef.current.innerText = res.data.len})
      .catch(err => {
        console.log("err = ",err)
      })
  }
  function handleComments(){
    axios(
      {
  
        method : 'post',
        url : "/image/Comment/postComment",
        data : JSON.stringify({
          userId : props.userId,
          imageId : props.imageId,
          comment : commentRef.current.value,
          clientName : setUserNameRef.current.checked ? "Anonymous" : props.userName
        }),
        headers: {'Content-Type': 'application/json' },
        withCrdentials: true
      })
      .then((res) => {
        console.log("res = ", res)
        commentRef.current.value = "";
        addcommentbox()
        commentCountRef.current.innerText = res.data.len
      })
        .catch(err => {
          console.log("err = ",err)
        })
  }
  function getComments(){


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
      <Card.Header>
      <UserProfile/>{props.userName}<br></br>
      
      </Card.Header>
      {/* <span >userid = {props.userId}</span> */}
      <Card.Body>
      {props.caption}
      <Card.Img
        variant="top"
        src={props.src}
        alt="comp"
        
        
      />
      </Card.Body>
      {/* <Card.Body>Likes <span ref = {likeRef}>{props.likes}</span></Card.Body> */}
      <Card.Footer>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick = {handleChange} >

            <Likes/> Likes <span ref = {likeRef}>{props.likes}</span>
          </Button>
          <Button variant="secondary" onClick={viewcomments}>
            <Comments /> Comments <span ref = {commentCountRef}>{props.comments}</span>
          </Button>
          <Button variant="secondary" onClick={addcommentbox}>
            <AddCommentIcon  /> Add Comment
          </Button>
        </ButtonGroup>
        <div className="nodisplay"  ref={addcommentboxref} >
        <input type="checkbox" name="setUserName" ref = {setUserNameRef}/>
        <label for="setUserName">Comment Anonymously</label>
        <textarea placeholder="Write your comment"  width="400px" ref = {commentRef}></textarea>
        <button style={{height:"40px"}} onClick = {handleComments}>Post</button>
        </div>
        <div className="nodisplay" ref={viewcommentsRef} >
        {
          comments.map((comment, index) => {
          return (
            <Comment viewcommentsRef={viewcommentsRef} key = {index} comment = {comment} />
          )
          })
        }
        </div>
      </Card.Footer>          
      
    </Card>
    </div>
  );
};

export default Item;

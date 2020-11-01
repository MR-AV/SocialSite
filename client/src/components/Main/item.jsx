import React, { useState, useRef } from "react";
import Likes from '@material-ui/icons/ThumbUpAlt';
import Comments from '@material-ui/icons/ChatBubble';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Card, ButtonGroup, Button } from "react-bootstrap";
import axiosCall from "../../ajaxRequest"
import UserProfile from '@material-ui/icons/AccountCircle';
import { ENDPOINT } from "../utils";
import './styles.css'
import Comment from './Comment';
import { navigate } from "hookrouter";

let change = 1
const Item = function(props) {
  const addcommentboxref= useRef(null)
  const viewcommentsRef = useRef(null)
  const commentRef      = useRef(null)
  const commentCountRef = useRef(null)
  const likeRef = useRef(null)
  const setUserNameRef = useRef(null)
  const [comments, setComments] = useState([]);
  
  
  function addcommentbox(){
    addcommentboxref.current.classList.toggle("addcommentdiv");
  }
  function viewcomments(){

  viewcommentsRef.current.classList.toggle("commentdiv");
  const method = 'post'
  const url = "/image/Comment/getComments"
  const obj = {userId : props.userId,
                 imageId : props.imageId}

  axiosCall(method, url, obj)
  .then( (res) => {
    if(res.data.isAuthenticated === false) 
      navigate('/')
    else
    setComments(res.data.comments);
  })
  .catch((err) => console.log("errInGettingComments = ",err));
  }

  function handleChange(){
    const method = 'post'
    const url = "/image/postLikes"
    const obj = {userId : props.userId,
                 imageId : props.imageId}

    axiosCall(method, url, obj)
    .then((res) => {
      //console.log("auth = ",res.data.isAuthenticated)
      if(res.data.isAuthenticated === false) 
      navigate('/')
      else
      likeRef.current.innerText = res.data.len})
    .catch(err => {
        console.log("err = ",err)
      })
  }

  function handleComments(){

    const method = 'post'
    const url = "/image/Comment/postComment"
    const obj = {userId : props.userId,
                 imageId : props.imageId,
                 comment : commentRef.current.value,
                 clientName : setUserNameRef.current.checked ? "Anonymous" : props.userName}
    axiosCall(method, url, obj)
    .then((res) => {
      if(res.data.isAuthenticated === false) 
        navigate('/')
      else{
        let val = commentRef.current.value
        commentRef.current.value = "";
        addcommentbox()
        commentCountRef.current.innerText = res.data.len
        setComments( prev => [...prev, {clientName : props.userName, comment : val}])
      }
      })
    .catch(err => {
          console.log("err = ",err)
        })
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

import React, { useState,useRef,useEffect } from "react"
import Item from "./item"
import MyNav from "../navbar/navbar"
import Image from "./Image"
import axios from "axios"
import { ENDPOINT } from "../utils";
import { navigate } from 'hookrouter';
import './styles.css'


const App = function(props) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${ENDPOINT}/image/get-images`,{ withCredentials: true })
      .then(res => {
        console.log("res.data = " ,res.data);
        if(res.data.isAuthenticated === false) 
          navigate('/')
        else
        setItems(res.data);
      });
  }, []);

  const uploadRef = useRef(null)
  function showuploadbox(){
    // uploadRef.current.classList.toggle('a');
    uploadRef.current.classList.toggle("uploadbox");
  }


  return (  
    <div  >
      <MyNav  user={props.user} showuploadbox={showuploadbox} />
      {/* <button onClick={showuploadbox} >click</button> */}
      <div ref={uploadRef} className="nodisplay" >
      <Image />
      </div>
      <div>
        {items.map(function(item, index) {
          return (
            <Item
              key={index}
              src={item.url}
              caption = {item.caption}
              likes = {item.likes}
              imageId = {item.imageId}
              userId = {item.userId}
              comments = {item.comments}
              userName = {props.user.userName}
              
            />
          );
          })
         
        }
      </div>
    </div>
  );
};

export default App;

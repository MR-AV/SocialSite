import React, { useState,useRef,useEffect } from "react"
import Item from "./item"
import MyNav from "../navbar/navbar"
import Image from "./Image"
import axios from "axios"
import { ENDPOINT } from "../utils";
import './styles.css'


const App = function(props) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${ENDPOINT}/get-images`,{ withCredentials: true })
      .then(res => {
        console.log(res.data);
        setItems(res.data);
      });
  }, []);

  const uploadRef = useRef(null)
  function showuploadbox(){
    // uploadRef.current.classList.toggle('a');
    uploadRef.current.classList.toggle("a");
  }


  return (  
    <div  >
      <MyNav  user={props.user} showuploadbox={showuploadbox} />
      {/* <button onClick={showuploadbox} >click</button> */}
      <div ref={uploadRef} className="b" >
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
              
            />
          );
          })
         
        }
      </div>
    </div>
  );
};

export default App;

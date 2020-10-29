import React, { useState,useRef } from "react"
import Item from "./item"
import MyNav from "../navbar/navbar"
import Image from "./Image"
import axios from "axios"
import { ENDPOINT } from "../utils";
import './styles.css'


const App = function(props) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${ENDPOINT}/get-images`,{ withCredentials: true })
      .then(res => {
        console.log(res.data);
        setItems(res.data);
      });
  }, []);

  function handleChange() {
    setCount(count + 1);
  }
  const uploadRef = useRef(null)
  function showuploadbox(){
    // uploadRef.current.classList.toggle('a');
    uploadRef.current.classList.toggle("a");
  }


  return (  
    <div  >
      <MyNav count={count} user={props.user} showuploadbox={showuploadbox} />
      {/* <button onClick={showuploadbox} >click</button> */}
      <div ref={uploadRef} className="b" >
      <Image />
      </div>
      <button onClick={handleClick}>Reload</button>
      <div style={{border: "20px solid red"}}>
        {items.map(function(item, index) {
          return (
            <Item
              key={index}
              src={item.url}
              caption = {item.caption}
              likes = {item.likes}
              imageId = {item.imageId}
              userId = {item.userId}
              addToCart={handleChange}
              changeRoot={props.changeRoot}
            />
          );
          })
         
        }
      </div>
    </div>
  );
};

export default App;

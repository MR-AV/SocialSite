import React, { useState, useEffect } from "react"
import Item from "./item"
import MyNav from "../navbar/navbar"
import Image from "./Image"
import axios from "axios"
import { ENDPOINT } from "../utils";


const App = function(props) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${ENDPOINT}/get-images`,{ withCredentials: true })
      .then(res => {
        //console.log(res.data);
        setItems(res.data);
      });
  }, []);

  function handleChange() {
    setCount(count + 1);
  }


  return (  
    <div>
      <MyNav count={count} user={props.user} />
      <Image />
      <div className="card-style d-flex justify-content-center">
        {items.map(function(item, index) {
          return (
            <Item
              key={index}
              src={item.url}
              caption = {item.caption}
              likes = {item.likes}
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

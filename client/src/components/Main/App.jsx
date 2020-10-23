import React, { useState } from "react"
import Item from "./item"
import MyNav from "../navbar/navbar"
import Image from "./Image"
import axios from "axios"
import { ENDPOINT } from "../utils";

const App = function(props) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  function handleChange() {
    setCount(count + 1);
  }
  
  function getAllImages() {
    axios.get(`${ENDPOINT}/get-images`,{ withCredentials: true })
      .then(res => {
        console.log(res.data);
        setItems(res.data);
      })
  }

  function handleClick() {
    console.log('Hey, you clicked!');
    getAllImages();
  }


  return (  
    <div>
      <MyNav count={count} user={props.user} />
      <Image />
      <button onClick={handleClick}>Reload</button>
      <div className="card-style d-flex justify-content-center">
        {items.map(function(item, index) {
          return (
            <Item
              key={index}
              src={item}
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

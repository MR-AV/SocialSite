import React, { useState } from "react";
import App from "./Main/App";
import Cart from "./Main/Cart";
import User from './User/User';
import { useRoutes } from 'hookrouter';
import {HTML404 } from './ErrorPage/Error';
const tmpUser = {
  username: 'Angela Yu',
  userProfile: 'https://cdn-images-1.medium.com/max/1200/1*8OkdLpw_7VokmSrzwXLnbg.jpeg',
  userBackground: 'https://i.ytimg.com/vi/f600WUNFMYI/maxresdefault.jpg'
}

function getRoutes(user) {
  return {
    '/': () => <App user={user} />,
    '/cart': () => <Cart user={user} />,
    '/user-profile': ()=><User user={user} />
  }
}

function Render() {
  const [state, setState] = useState(0);
  const [user, setUser] = useState(tmpUser);
  
  function handleRoot() {
      setState(1);
    }
      
    
  const page = useRoutes(getRoutes(user));
  return (
    page || <HTML404 />
  );
}

export default Render;

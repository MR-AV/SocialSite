import React, { useState, useEffect } from "react";
import App from "./Main/App";
import Cart from "./Main/Cart";
import User from './User/User';
import axios from "axios";
import { useRoutes } from 'hookrouter';
import {HTML404 } from './ErrorPage/Error';
import SetUsername from './SetUsername/SetUsername';

const tmpUser = {
  userName: 'Angela Yu',
  userProfile: 'https://cdn-images-1.medium.com/max/1200/1*8OkdLpw_7VokmSrzwXLnbg.jpeg',
  userBackground: 'https://i.ytimg.com/vi/f600WUNFMYI/maxresdefault.jpg'
}

function getRoutes(user) {
  return {
    '/app': () => <App user={user}/>,
    '/cart': () => <Cart user={user} />,
    '/user-profile': ()=><User user={user} />,
    '/set-username':()=><SetUsername />
  }
}

async function getUserName(setUser){

    const res = await axios.get("/getUserName", {withCredentials : true})
    setUser(res.data);
    
} 
function Feed() {
  
  const [user, setUser] = useState(tmpUser)

  useEffect(() => {
    getUserName(setUser);
  }, [])

  const page = useRoutes(getRoutes(user)) 
    return(
     page || <HTML404 />
    )

  
}

export default Feed;

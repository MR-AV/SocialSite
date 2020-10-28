import React , {useEffect}  from "react";
import axios from "axios"
import { ENDPOINT } from "../utils";
import { navigate } from 'hookrouter';

const SetUsername = () => {


    useEffect(()=>{
          

            async function fun(){
                console.log('yoyo');
                await axios.get(`${ENDPOINT}/auth/google/allow-access`,{ withCredentials: true })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data === false) {
                        navigate('/app')
                    }
                })
                console.log('yoyoyoy');
                } 
                fun();
    })
    return(

        <div>
        <h1>Set your username</h1>
        <form action="/auth/google/set-username" method="post">
            <input type="text" name="a"></input>
            <button type="submit">done</button>
        </form>
        </div>

    )

}


export default SetUsername;
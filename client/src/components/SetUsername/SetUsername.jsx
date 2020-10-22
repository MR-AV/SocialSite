import React from "react";

const SetUsername = () => {


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
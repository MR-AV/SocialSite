import React, { useState, useRef } from "react";
import './styles.css'
import UserProfile from '@material-ui/icons/AccountCircle';

const Comment = function(props){



return(
    <div >
        <p><UserProfile /><strong>{props.comment.clientName || "Anonymous"} </strong></p>
        <p>{props.comment.comment}</p>
    </div>
);

};



export default Comment;
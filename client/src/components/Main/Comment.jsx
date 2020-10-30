import React, { useState, useRef } from "react";
import './styles.css'


const Comment = function(props){



return(
    <div >
        <p><strong>{props.comment.clientName || "Anonymous"} </strong></p>
        <p>{props.comment.comment}</p>
    </div>
);

};



export default Comment;
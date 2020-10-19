import React from "react";

const Image = function(){

    return (
    <form method = "POST" action = "/upload/image" enctype="multipart/form-data" >  
      <input type = "file" name = "image" />
      <button type = "submit">Upload</button>
    </form>

    )
}

export default Image;
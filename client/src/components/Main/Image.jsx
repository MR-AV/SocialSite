import React, { useState } from "react";

const Image = function(){
  const [image, setImage] = useState(null);

  function handleChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <form method="POST" action="/upload/image" enctype="multipart/form-data" >
      {image && <img src={image} alt="" width="300px" height="300px" />}
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Image;
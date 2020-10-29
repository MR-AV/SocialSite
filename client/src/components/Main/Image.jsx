import React, { useState } from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";

const Image = function(){
  const [image, setImage] = useState(null);

  function handleChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <Card
      border="warning"
      style={{
        margin: "20px",
        width: "18rem"
      }}
    >
    <form method="POST" action="/upload/image" enctype="multipart/form-data" >
      <Card.Header><textarea name = "caption" placeholder = "Enter Caption" ></textarea></Card.Header>
      {image && <Card.Img src={image} alt="" width="300px" height="300px" />}
      <Card.Footer>
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Upload</button>
      </Card.Footer>
    </form>
    </Card>
  );
}

export default Image;
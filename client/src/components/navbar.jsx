import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Badge
} from "react-bootstrap";

// function loadDoc(url, cFunction) {
//   var xhttp;
//   xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//       cFunction(this);
//     } else {
//       console.log("inside");
//     }
//   };
//   console.log(url);
//   xhttp.open("GET", url, true);
//   xhttp.send();
// }
// function myFunction(xhttp) {
//   // var myObj = JSON.parse(xhttp.responseText);
//   // console.log(myObj);
//   console.log("content = ");
//   console.log(xhttp.responseText);
//   // document.getElementById("demo").innerHTML =
//   // xhttp.responseText;
// }
const MyNav = function(props) {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand href="#">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success" className="mx-1">
            Search
          </Button>
        </Form>
        <Button variant="primary" className="mx-1">
          <AddShoppingCartIcon />
          <Badge variant="secondary">{props.count}</Badge>
        </Button>
        {/* <button
          onClick={() =>
            loadDoc(
              "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json",
              myFunction
            )
          }
        >
          ClickMe
        </button> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;

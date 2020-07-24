import React,{useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import './styles.css'
import {ENDPOINT} from '../utils'
import { A } from 'hookrouter';

const MyNav = function(props) {
  let arr=["balpreet","akash","mudit","manu","bhuvan","jagdish","lonavla"];
  const [filter,setFilter]=useState("");
  const [filterArr,setFilterArr]=useState([ ]);
  function mouseov(){
    document.querySelector('.searchbox').style.display='block';
  }
  function mouseou(){
    document.querySelector('.searchbox').style.display='none';
  }
  function fil(event){
    let x=event.target.value;
    setFilter(x);
    let newArr=arr.map(el=>{
      if(el.includes(filter))
      return el;
    })
    if(x==="")
    setFilterArr([ ]);
    else
    setFilterArr(newArr);

  }
  return (
    <div>
    <Navbar sticky="top" bg="light" expand="lg" >
      <A href="/"><Navbar.Brand >Shopily</Navbar.Brand></A>
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
          <Form inline >
            <div>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" value={filter} onFocus={mouseov} onChange={fil} onBlur={mouseou} autoComplete="off" />
              <div className="searchbox" >
                {filterArr.map((el,index)=><div className="element" key={index}><a href="#">{el}</a></div>)}  
              </div>
            </div>
          <Button variant="outline-success" className="mx-1">
              Search
          </Button>
          </Form>
          {props.user.username ?
            <Button variant="primary" className="mx-1">
              <A href="/user-profile" className="login-link"><AccountCircleIcon  /></A>
            </Button> :
            <Button variant="primary" className="mx-1">
              <a href={`${ENDPOINT}/auth/google`} className="login-link">Login</a>
            </Button>
            
          }
        
      </Navbar.Collapse>
     
    </Navbar>
    </div> 
    
  );
};

export default MyNav;

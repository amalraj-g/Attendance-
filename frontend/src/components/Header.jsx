import React from 'react';
import { Navbar, Nav, Container} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
// import { useSelector } from 'react-redux'
import {FaUser  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';;

const Header = () => {
    

return (
  <div>
     <Navbar bg="warning" variant="dark" expand="md" collapseOnSelect>
          <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>Time Tracker</Navbar.Brand>
                
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                      
       
                      <LinkContainer to='/login'>
                        <Nav.Link><FaUser />Sign In</Nav.Link>
                      </LinkContainer>
                      
                      
                    </Nav>
                </Navbar.Collapse>  
            </Container>
        </Navbar>
    
  </div>  
  ) 
}
export default Header
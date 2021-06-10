import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import SignIn from "./SignIn.js";

const Navigation = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Camille's Corner</Navbar.Brand>
    <Navbar style={{backgroundColor:"#003366"}}>
      <Link href="#home" style={{color:"beige",fontWeight:800,fontSize:28,paddingRight:30,paddingLeft:17}}>CAMILLE'S CORNER</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/blog">
            Blog
          </Nav.Link>
          <Nav.Link as={Link} to="/forum">
            Forum
          </Nav.Link>
          <Nav.Link as={Link} to="/store">
            Store
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <SignIn />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Navbar>
  );
};

export default Navigation;

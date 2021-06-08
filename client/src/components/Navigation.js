import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import firebase from "../auth.js";

const Navigation = (props) => {
  const [user, setUser] = useState(false);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setUser(true);
        return false;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(false));
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Camille's Blog</Navbar.Brand>
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
          {user ? (
            <>
              <Nav.Link as="p" className="mb-0">
                Signed in as {firebase.auth().currentUser.displayName}
              </Nav.Link>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button onClick={signInWithGoogle}>Sign In</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

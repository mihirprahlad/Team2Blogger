import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Navigation = (props) => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed = "bottom" class="nav justify-content-end">
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={Link} to={{pathname: "https://twitter.com"}} target = "_blank">
                            <FontAwesomeIcon icon={['fab', 'twitter']} /> Twitter
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={{pathname: "https://youtube.com"}} target = "_blank">
                            <FontAwesomeIcon icon={['fab', 'youtube']} /> Youtube
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={{pathname: "https://instagram.com"}} target = "_blank">
                            <FontAwesomeIcon icon={['fab', 'instagram']} /> Instagram
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as = {Link} to= "/login">
                            Create an account!
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Navigation;

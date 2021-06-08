import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Navigation = (props) => {
    return (
        <footer class="page-footer bg-dark text-white">
            <div class = "container-fluid text-center text-md-left">
                <div class = "row">
                    <div class="col-md-6 mt-md-2 mt-3">
                        <FontAwesomeIcon icon = {["far", "copyright"]}/> The Camille Connection
                    </div>
                    <div class="col-md-6 mb-md-0 mb-3">
                        <Nav class="nav justify-content-end">
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
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Navigation;

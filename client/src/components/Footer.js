import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <footer
      className="page-footer text-white"
      style={{ backgroundColor: "#003366" }}
    >
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-2 mt-3">
            <FontAwesomeIcon
              style={{ color: "beige" }}
              icon={["far", "copyright"]}
            />{" "}
            <h style={{ color: "beige", fontWeight: 800, fontSize: 20 }}>
              The Camille Connection
            </h>
          </div>
          <div className="col-md-6 mb-md-0 mb-3">
            <Nav className="nav justify-content-end">
              <Nav.Item>
                <Nav.Link
                  style={{ color: "beige", fontWeight: 800, fontSize: 17 }}
                  as={Link}
                  to={{ pathname: "https://twitter.com" }}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    style={{ color: "beige" }}
                    icon={["fab", "twitter"]}
                  />{" "}
                  Twitter
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  style={{ color: "beige", fontWeight: 800, fontSize: 17 }}
                  as={Link}
                  to={{ pathname: "https://youtube.com" }}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    style={{ color: "beige" }}
                    icon={["fab", "youtube"]}
                  />{" "}
                  Youtube
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  style={{ color: "beige", fontWeight: 800, fontSize: 17 }}
                  as={Link}
                  to={{ pathname: "https://instagram.com" }}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    style={{ color: "beige" }}
                    icon={["fab", "instagram"]}
                  />{" "}
                  Instagram
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  style={{ color: "beige", fontWeight: 800, fontSize: 17 }}
                  as={Link}
                  to="/login"
                >
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

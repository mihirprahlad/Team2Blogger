import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../../App.css";
import Spinner from "react-bootstrap/Spinner";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useQuill } from "react-quilljs";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.js";
import Comments from "../Comments/Comments";

export default function BlogPost() {
  const history = useHistory();
  const { blogID } = useParams();
  const [content, setContent] = useState(null);
  const [edit, setEdit] = useState(false);
  const { user } = useContext(UserContext);

  // Loads every single blog post. If blog post matches ID, the content for the page is set.
  useEffect(() => {
    fetch("http://localhost:5000/blogpost")
      .then((res) => res.json())
      .then((res) => {
        res.forEach((res) => {
          if (res.id === blogID) {
            console.log(res);
            setContent(res);
          }
        });
      });
  }, []);

  // Checks that URL is an image URL
  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  return (
    <div>
      {user && user.is_admin && (
        <div style={{ right: "1%", top: "10%", position: "absolute" }}>
          {user && user.is_admin && (
            <Button
              style={{
                width: "5rem",
                marginBottom: "3px",
                backgroundColor: "#4C6357",
                border: "none",
              }}
              onClick={(e) => {
                history.push("/editpost/" + content.id);
                e.stopPropagation();
              }}
            >
              Edit
            </Button>
          )}
        </div>
      )}
      {content ? (
        <div
          style={{
            marginLeft: "17%",
            marginRight: "17%",
            marginTop: "28px",
            marginBottom: "100px",
          }}
        >
          <Row>
            <Col sm={10}>
              <h1 style={{ fontWeight: "bold" }}>{content.title}</h1>
              <h4>Camille Cooper</h4>
              <h6>{content.date}</h6>
              {content.editDate && (
                <h6 style={{ fontStyle: "italic" }}>
                  Updated: {content.editDate}
                </h6>
              )}
            </Col>
            <Col sm={2}>
              <Image
                style={{ width: "5rem" }}
                src="https://drive.google.com/thumbnail?id=1wJ0SlPBrq0AQp10LzpcdjqJIijQndLnT"
                roundedCircle
              />
              {user && (
                <div>
                  <button type="button" class="btn btn-link">
                    <FaThumbsUp size={20} style={{ color: "#003366" }} />
                  </button>
                  <button type="button" class="btn btn-link">
                    <FaThumbsDown size={20} style={{ color: "#003366" }} />
                  </button>
                </div>
              )}
              <p style={{ fontSize: "12px", paddingTop: 5 }}>
                Likes: 300 Dislikes: 25
              </p>
            </Col>
          </Row>
          {checkURL(content.image) && (
            <Row
              style={{
                justifyContent: "center",
                marginBottom: "15px",
                marginTop: "5px",
              }}
            >
              <Image
                style={{ maxWidth: "50rem", maxHeight: "20rem" }}
                src={content.image}
              />
            </Row>
          )}
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
          <br />
          {Comments(history.location.pathname, blogID, content.title)}
        </div>
      ) : (
        <div class="center">
          <Spinner animation="grow" />
        </div>
      )}
    </div>
  );
}

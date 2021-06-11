import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import axios from "axios";

const Likes = ({ postId, initialLikes, initialDislikes }) => {
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  // Function to handle likes and dislikes
  const like = (action) => {
    // Prepare the request body for the API call
    const reqBody = {
      user_id: user.id,
      action,
    };

    // Add a like/dislike if user has already liked/disliked the post
    // Remove the like/dislike if user has alerady liked/disliked the post
    const userMap = action === "like" ? likes : dislikes;
    if (userMap[user.id]) {
      deleteLike(reqBody);
    } else {
      postLike(reqBody);
    }
  };

  // Wrapper for the API post request
  const postLike = (reqBody) => {
    axios
      .post(`http://localhost:5000/forumpost/${postId}/likes`, reqBody)
      .then((res) => {
        // Update state variables with new likes and dislikes
        setLikes(res.data.likes);
        setDislikes(res.data.dislikes);
      });
  };

  // Wrapper for the API delete request
  const deleteLike = (reqBody) => {
    axios
      .delete(`http://localhost:5000/forumpost/${postId}/likes`, {
        data: reqBody,
      })
      .then((res) => {
        // Update state variables with new likes and dislikes
        setLikes(res.data.likes);
        setDislikes(res.data.dislikes);
      });
  };

  return (
    <>
      {user && (
        <div>
          <button
            type="button"
            class="btn btn-link"
            onClick={() => like("like")}
          >
            <FaThumbsUp size={20} style={{ color: likes[user.id] ? "#66c144" : "#003366" }}/>
          </button>
          <button
            type="button"
            class="btn btn-link"
            onClick={() => like("dislike")}
          >
            <FaThumbsDown size={20} style={{ color: dislikes[user.id] ? "#e31f0e" : "#003366" }} />
          </button>
        </div>
      )}
      <p style={{ fontSize: "12px", paddingTop: 5 }}>
        Likes: {Object.keys(likes).length} Dislikes:{" "}
        {Object.keys(dislikes).length}
      </p>
    </>
  );
};

export default Likes;

import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

const Likes = (props) => {
  const { user } = useContext(UserContext);

  return (
    <>
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
      <p style={{ fontSize: "12px", paddingTop: 5 }}>Likes: 300 Dislikes: 25</p>
    </>
  );
};

export default Likes;

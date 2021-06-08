import firebase from "../auth.js";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SignIn = (props) => {
  const { user, setUser } = useContext(UserContext);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        getUser(res.user);
        return false;
      });
  };

  const getUser = (user) => {
    axios
      .get(`http://localhost:5000/users/${user.uid}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        createUser(user);
      });
  };

  const createUser = (user) => {
    const newUser = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
    };

    axios.post("http://localhost:5000/users", newUser).then((res) => {
      setUser(res.data);
    });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(false));
  };

  return (
    <>
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
    </>
  );
};

export default SignIn;

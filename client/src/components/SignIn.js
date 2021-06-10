import firebase from "../auth.js";
import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SignIn = (props) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        getUser(currentUser);
      }
    });
  }, []);

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
          <Nav.Link style={{color:"#faf0e6"}} as="p" className="mb-0">
            Signed in as {firebase.auth().currentUser.displayName}
          </Nav.Link>
          <Button style={{backgroundColor:"#faf0e6",color:"#000080",border:"none"}} onClick={logout}>Logout</Button>
        </>
      ) : (
        <Button style={{backgroundColor:"#faf0e6",color:"#000080",border:"none"}} onClick={signInWithGoogle}>Sign In</Button>
      )}
    </>
  );
};

export default SignIn;

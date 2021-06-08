import firebase from "../auth.js";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const SignIn = (props) => {
  const { user, setUser } = useContext(UserContext);

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

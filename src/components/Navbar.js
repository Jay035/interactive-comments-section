import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };
  
  return (
    <nav>
      <div className="btns">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        ): (
          <Link to="/addComment" className="add-new-comment-btn">
            Add Comment
          </Link>
        )}
      </div>
      {user && (
        // current user details 
        <div>
          <h3>{auth.currentUser?.displayName}</h3>
          <img
            src={auth.currentUser?.photoURL || ""}
            width="50"
            height="50"
            alt=""
          />
          <button className="btn" onClick={signUserOut}>Log Out</button>
        </div>
      )}
    </nav>
  );
}

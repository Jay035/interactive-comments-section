import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const {setAddCommentModalShown } = UserAuth();

  const signUserOut = async () => {
    // add a confirm modal 
    // if(confirm("Are you sure you want to sign out?")){

      await signOut(auth);
    // }
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
          <Link to="" onClick={() => setAddCommentModalShown(prevState => !prevState)} className="add-new-comment-btn">
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

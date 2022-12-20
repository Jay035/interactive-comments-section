import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from 'firebase/auth';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { signIn } = UserAuth();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    navigate('/');
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try{
  //     await signIn(email, password);
  //     navigate('/main');
  //   } catch(e){
  //     console.log(e.message)
  //   }
  // }

  return (
    // <form className="form container ">
      <div className="login">
        <h1>Sign In With Google To Continue</h1>
        <button className="btn" onClick={signInWithGoogle}>Sign In With Google</button>
        {/* email */}
        {/* <div className="input flex flex-col">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="email"
            className="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div> */}
        {/* password */}
        {/* <div className="input flex flex-col">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="password"
            className="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div> */}

        {/* <div className="forgot-password flex justify-end cursor-pointer">
          Forgot password?
        </div>
        <button className="form-button">SIGN IN</button>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="cursor-pointer font-bold"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p> */}
      </div>
    // </form>
  );
};

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await signIn(email, password);
      navigate('/main');
    } catch(e){
      console.log(e.message)
    }
  }

  return (
    <form className="form container " onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="text-center title">
          <h1>Welcome</h1>
          <p>Sign in to your account</p>
        </div>
        {/* email */}
        <div className="input flex flex-col">
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
        </div>
        {/* password */}
        <div className="input flex flex-col">
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
        </div>

        <div className="forgot-password flex justify-end cursor-pointer">
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
        </p>
      </div>
    </form>
  );
};

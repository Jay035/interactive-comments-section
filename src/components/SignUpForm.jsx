import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {createUser} = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try{
      await createUser(email, password);
      navigate('/main');
    } catch(e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  return (
    <form className="form container" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="text-center title">
          <h1>Sign up</h1>
          <p>
            Already have an account?&nbsp;
            <span
              className="cursor-pointer font-bold"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
        {/* Name */}
        {/* <div className="input flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            required
          />
        </div> */}
        {/* email */}
        <div className="input flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            // ref={emailRef}
            required
          />
        </div>
        {/* password */}
        <div className="input flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
        </div>
        {/* password confirmation */}
        <div className="input flex flex-col">
          <label htmlFor="password-confirmation">Confirm Password</label>
          <input
            type="password"
            id="password-confirmation"
            className="password"
            // onChange={(event) => {
            //   setRegisterPassword(event.target.value);
            // }}
            required
          />
        </div>
        {/* {user?.email} */}
        {/* terms agreement */}
        {/* <div className="terms-agreement flex justify-center">
            <input type="checkbox" name="" id="" />
            <p>I read and agree to <a href="" className="cursor-pointer">Terms & conditions</a></p>
          </div> */}

        <button className="form-button">
          CREATE ACCOUNT
        </button>
      </div>
    </form>
  );
};

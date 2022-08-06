
export const SignUpForm = () => {
  return (
    <form className="signup-form container flex-col text-center">
        <div className="">
            <h1>Sign up</h1>
            <p>Already have an account? <a href="" className="cursor-pointer">Sign in</a></p>
        </div>
        {/* Name */}
        <div className="input flex flex-col">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />
        </div>
        {/* email */}
        <div className="input flex flex-col">
          <label htmlFor="signup-email">Email</label>
          <input type="email" id="signup-email" className="email" required />
        </div>
        {/* password */}
        <div className="input flex flex-col">
          <label htmlFor="signup-password">Password</label>
          <input type="password" id="signup-password" className="password" required />
        </div>
        {/* terms agreement */}
        {/* <div className="terms-agreement flex justify-center">
          <input type="checkbox" name="" id="" />
          <p>I read and agree to <a href="" className="cursor-pointer">Terms & conditions</a></p>
        </div> */}

        <button className="form-button">CREATE ACCOUNT</button>
        {/* <p>Already have an account? <a href="" className="cursor-pointer">Sign in</a></p> */}
    </form>
  )
}

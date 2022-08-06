
export const LoginForm = () => {
  return (
    <form className="login-form container flex-col text-center">
        <div className="">
            <h1>Welcome</h1>
            <p>Sign in to your account</p>
        </div>
        {/* email */}
        <div className="input flex flex-col">
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" className="email" required />
        </div>
        {/* password */}
        <div className="input flex flex-col">
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" className="password" required />
        </div>

        <div className="forgot-password flex justify-end cursor-pointer">Forgot password?</div>
        <button className="form-button">SIGN IN</button>
        <p>Don't have an account? <a href="" className="cursor-pointer">Sign up</a></p>
    </form>
  )
}

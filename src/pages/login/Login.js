import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logImg from "../../assets/images/login/login.svg";
import { AuthContext } from "../../contexts/ProvideContext";

const Login = () => {
const {login,user} = useContext(AuthContext)
// console.log(user);
const [error,setError] = useState('')

  const handlelogin = (event) => {
    event.preventDefault();
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
   
login(email,password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  toast(user)
  setError('')
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  setError(errorMessage)
});

setError('')

  };
  return (
    <div className="hero w-full my-20 ">
      <div className="hero-content gap-10 grid md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={logImg} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form onSubmit={handlelogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <p className="text-red-500">{error}</p>
              <h6>Need register , <Link to={'/signup'}>register please..</Link></h6>
            </div>

            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

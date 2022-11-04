import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye,FaEyeSlash } from "react-icons/fa";

import logImg from "../../assets/images/login/login.svg";
import { AuthContext } from "../../contexts/ProvideContext";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  // console.log(user);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [show, setshow] = useState(false);

  const handleShow = () => {
    return setshow(!show);
  };

  const handlelogin = (event) => {
    event.preventDefault();
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    login(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast(user);
        setError("");
        form.reset();
        console.log(user.email)


        const currentUser = {
          email:user.email
        }

        console.log(currentUser);
// get jwt token ////
fetch('http://localhost:5000/jwt',{
  method:'POST',
  headers:{
    'content-type':'application/json'
  },
  body:JSON.stringify(currentUser)
})
.then(res =>res.json())
.then(data=>{
  console.log(data);
  //////// local storage is not best for jwt but easy .

  localStorage.setItem('SHcarsToken',data.token)
  toast('added token')
  navigate(from, { replace: true });

})


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        
      
      });

    setError("");
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
                <span className="text-xl" onClick={handleShow}>{show?<FaEye/>:<FaEyeSlash/>}</span>
              </label>
              <input
                 type={show?'text':'password'}
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="." className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <p className="text-red-500">{error}</p>
              <h6>
                Need register , <Link to={"/signup"}className='link link-hover'>register please....</Link>
              </h6>
            </div>

            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
        </div>
      <ToastContainer />
      </div>
    </div>
  );
};

export default Login;

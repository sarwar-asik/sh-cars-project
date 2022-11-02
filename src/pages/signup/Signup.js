import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logImg from "../../assets/images/login/login.svg";
import app from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../contexts/ProvideContext";



const auth = getAuth(app);


const Signup = () => {
  const [error, setError] = useState("");

const {createUser,user} = useContext(AuthContext)

// console.log(user);

  const handlelogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast("registered");
        alert('regiterd')
        console.log(user);
        setError('')
        form.reset()
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
       
        // ..
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
          <h1 className="text-5xl font-bold">Sign up,Please!</h1>
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
                Did sign Up ?{" "}
                <Link to={"/login"} className="text-blue-500">
                  Log in please ...
                </Link>
              </label>
              <p className="text-red-500">{error}</p>
            </div>

            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

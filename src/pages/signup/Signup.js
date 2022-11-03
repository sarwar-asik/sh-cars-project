import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logImg from "../../assets/images/login/login.svg";
import app from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../contexts/ProvideContext";

const auth = getAuth(app);

const Signup = () => {
  const [error, setError] = useState("");

  const { createUser, user, googleSignIn } = useContext(AuthContext);

  // console.log(user);

  const handlelogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast("registered");
        alert("regiterd");
        console.log(user);
        setError("");
        form.reset();

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            // toast('added name')
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);

        // ..
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
          <h1 className="text-5xl font-bold">Sign up,Please!</h1>
          <form onSubmit={handlelogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="FULL NAME"
                className="input input-bordered"
              />
            </div>
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

            {/* <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div> */}

            <div className="flex w-full">
            <div className="form-control mt-6 grid h-20 flex-grow card bg-base-300 rounded-box place-items-center btn btn-primary">
              <input
                className=""
                type="submit"
                value="Sign Up"
              />
            </div>

              <div className="divider divider-horizontal">OR</div>
              <div onClick={googleSignIn} className="grid h-20 mt-6 flex-grow card bg-base-300 rounded-box place-items-center btn btn-outline btn-warning ">
                <h2 className="text-yellow-800">Sign with <br /> <span  className="text-3xl text-yellow-700 font-semibold"> Google</span> </h2>
              </div>
            </div>

            <ToastContainer />
          </form>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

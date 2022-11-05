import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




export const AuthToken = (user) => {
  
  const currentUser = {
    email: user.email,
  };


const navigate = useNavigate();
const location = useLocation();

const from = location.state?.from?.pathname || "/";

//   console.log(currentUser);
  // get jwt token ////
  fetch("https://sh-cars-server.vercel.app/jwt", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //////// local storage is not best for jwt but easy .

      localStorage.setItem("SHcarsToken", data.token);
      toast("added token");
      navigate(from, { replace: true });

    });
};

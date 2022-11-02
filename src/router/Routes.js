import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Checkout from "../pages/checkout/Checkout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        {
          path:'/checkout/:id',
          element:<Checkout/>,
          loader:({params})=>fetch(`http://localhost:5000/services/${params.id}`)
        }
      ]
    },
  ]);
  export default router
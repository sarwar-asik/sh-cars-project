import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Checkout from "../pages/checkout/Checkout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Orders from "../pages/orders/Orders";
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
          loader:({params})=>fetch(`https://sh-cars-server.vercel.app/services/${params.id}`)
        },
        {
          path:'/orders',
          element:<Orders/>
        }
      ]
    },
  ]);
  export default router
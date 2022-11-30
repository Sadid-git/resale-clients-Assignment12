import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import About from "../page/About/About";
import MyProducts from "../page/DashBoard/MyProducts/MyProducts";
import MyUser from "../page/DashBoard/MyUsers/MyUser";
import Payment from "../page/DashBoard/Payment/Payment";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import CataProducts from "../page/Products/CataProducts/CataProducts";
import Products from "../page/Products/Products";
import DisplayError from "../page/Shared/MYError/DisplayError";
import Singup from "../page/Singup/Singup";
import AdminRoute from "./AdminRouts/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/singup",
        element: <Singup></Singup>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/cataproducts/:id",
        element: (
          <PrivateRoute>
            {" "}
            <CataProducts></CataProducts>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/resaleApple/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/myUser",
        element: (
          <AdminRoute>
            <MyUser></MyUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
      {
        path: "/dashboard/allBooking",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);
export default router;

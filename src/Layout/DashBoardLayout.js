import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../page/Shared/Navbar/Navbar";
import { AuthContext } from "../UserContext/UserContext";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="DashboardDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="DashboardDrawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li>
              <Link to={`/dashboard`}>My Products</Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to={`/dashboard/myUser`}>All Users</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;

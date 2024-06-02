// src/components/TopBar.js
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutAction } from "../Redux/actions/user/userAction";

function TopBar() {
  const { user } = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  // const { user } = useSelector(
  //   (state) => state.userDetail
  // );

  const logoutHandler = () => {
    if(user){
      dispatch(logOutAction());

    }
  }

  return (
    <div className="bg-gray-800 p-4 text-white flex justify-between">
      <nav className="flex items-center gap-4">
        <Link to="/" className=" hover:text-gray-500">
          Home
        </Link>
        <Link to="/about" className=" hover:text-gray-500">
          About Us
        </Link>
        <Link to="/doctors" className=" hover:text-gray-500">
          Doctors
        </Link>
        <Link to="/services" className=" hover:text-gray-500">
          Services
        </Link>
        <Link to="/contact" className="hover:text-gray-500">
          Contact Us
        </Link>
      </nav>
      <Link to="/upload">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -translate-x-36">
          Try It Now
        </button>
      </Link>
      <div className="flex gap-2 items-center justify-center">
          {user ?<><>
            <p>Hi {user.name}</p>
            <button onClick={logoutHandler} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
          </>
          </>  : <Link to="/login">Login/Sign up</Link>}
          
        </div>
        {/* Add more links as needed */}
      {/* </div> */}
    </div>
  );
}

export default TopBar;

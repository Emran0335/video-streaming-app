import React from "react";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import Search from "./Search";
import Button from "../Button";
import { Link } from "react-router-dom";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <nav className="flex justify-between items-center bg-black p-4">
      <Link to="/">
        <Logo />
      </Link>
      <Search />
      {!authStatus && (
        <div>
          <Link to="/login">
            <Button className="cursor-pointer bg-gray-400 hover:bg-gray-500 mr-1 py-2 rounded transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] sm:w-auto">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="cursor-pointer hover:bg-pink-600 mr-1 rounded bg-pink-700 px-3 py-2 text-center transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] sm:w-auto">
              Sign up
            </Button>
          </Link>
        </div>
      )}
      {authStatus && userData && (
        <Link to={`/channel/${userData.username}`}>
          <img
            src={userData.avatar}
            alt={userData.username}
            className="object-cover h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
          />
        </Link>
      )}
    </nav>
  );
}

export default Navbar;

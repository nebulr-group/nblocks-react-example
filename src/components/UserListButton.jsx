import { Link } from "react-router-dom";
import React from "react";

const UserListButton = (props) => {
  return (
    <Link
      to={"/user/list"}
      className="py-3 px-5 bg-indigo-400 rounded inline-block mt-10 text-white font-medium"
    >
      {props.children}
    </Link>
  );
};

export default UserListButton;

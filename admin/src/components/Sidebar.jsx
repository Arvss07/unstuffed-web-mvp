import React from "react";
import { routes } from "../constants/routes";

import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="px-4">
      <div className="w-full">
        <img className="max-w-[200px]" src={logo} alt="logo" />
      </div>

      <ul className="flex flex-col gap-7 mt-20">
        {routes.map((route, index) => (
          <NavLink key={index} to={route.path}>
            {({ isActive }) => (
              <>
                <div className={`flex items-center gap-2 hover:bg-drop_primary p-2 rounded-md  ${isActive && "bg-drop_primary"}`}>
                  <img src={route.logo} alt={route.path} />
                  <p className="text-white">{route.text}</p>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

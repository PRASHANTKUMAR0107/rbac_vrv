import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { PiUsersFourBold } from "react-icons/pi";
import { TfiWrite } from "react-icons/tfi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:flex">
      
      <div className=" bg-gray-900 text-white flex justify-between items-center p-4 md:hidden">
        <h1 className="text-lg font-semibold">(RBAC) <span className="font-extrabold text-cyan-200"> UI </span></h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none"
        >
          <CgMenuGridR />
        </button>
      </div>

      <div
        className={`bg-gray-900 rounded lg:m-2 md:m-2 text-white w-64 p-4 absolute md:static md:block h-screen md:h-auto transition-transform duration-300 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl text-right font-semibold mb-4 hidden md:block">(RBAC) <span className="font-extrabold text-cyan-200"> UI </span></h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block py-2 bg-gray-100/20 px-4 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center justify-between font-semibold text-lg"> Manage Users <PiUsersFourBold /> </span>
            </Link>
          </li>
          <li>
            <Link
              to="/roles"
              className="block py-2 bg-gray-100/20 px-4 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center justify-between font-semibold text-lg"> Manage Roles <TfiWrite /> </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;




import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 text-white ">
      <div className="mycontainer flex h-14 px-12 py-5 w-full  justify-between items-center">

        <div className="logo w-14 p-2 flex justify-center text-2xl">
          <span className="text-green-500">&lt;</span>
          <img className="w-full" src="/wired-outline-946-equity-security-hover-locked-new3.gif" alt="" />
          <span className="text-green-500">/&gt;</span>
        </div>
        {/* <ul className="">
          <li className="p-4 flex gap-4 font-normal ">
            <a className="font-semibold hover:underline" herf="/">Home</a>
            <a className="font-semibold hover:underline" herf="#">About</a>
            <a className="font-semibold hover:underline" herf="#">Contact</a>
            <a className="font-semibold hover:underline" herf="#">Services</a>
          </li>
        </ul> */}
        <button className="text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center hover:bg-green-800 ring-white ring-1">
          <img className="invert w-10 p-1 " src="/github.svg" alt="GitHub" /><span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

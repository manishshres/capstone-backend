import React from "react";

const Navbar = () => {
  return (
    <header className="bg-glaucous shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            className="h-8 w-8 text-saffron"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2 font-bold text-xl text-white">Capestone</span>
        </div>
        <nav>
          {/* <button className="bg-glaucous-400 hover:bg-glaucous-500 text-white font-semibold py-2 px-4 rounded shadow mr-2 transition duration-300">
            Log In
          </button>
          <button className="bg-saffron hover:bg-saffron-600 text-black font-bold py-2 px-4 rounded shadow transition duration-300">
            Register
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

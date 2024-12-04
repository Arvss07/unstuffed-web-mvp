import React from "react";

import search from "../assets/search.png";

const Searchbar = ({ onChange, value }) => {
  return (
    <div className="relative max-w-[40%] min-w-[300px]">
      <input
        value={value}
        onChange={onChange}
        className="w-full bg-drop_bg rounded-full shadow-xl p-2 pl-10 focus:outline-none"
        type="text"
        placeholder="Search"
      />

      <img className="absolute top-1/2 -translate-y-1/2 left-3" src={search} alt="" />
    </div>
  );
};

export default Searchbar;

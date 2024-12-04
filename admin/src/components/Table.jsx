import React from "react";

import info from "../assets/info.png";
import deete from "../assets/delete.png";

const Table = ({ isFetching, isError, data }) => {
  if (isFetching) return <h1>Fetching donations...</h1>;

  if (isError) return <h1>Sorry, having error fetching donations</h1>;

  console.log(data);

  return (
    <table className="w-[1000px] mx-auto">
      <th className="font-normal bg-light_primary text-white flex gap-3 justify-between p-2 px-20 rounded-t-full">
        <td>Name</td>
        <td>Date Donated</td>
        <td>Item Donated</td>
        <td>Email</td>
        <td>Status</td>
        <td>Action</td>
      </th>
    </table>
  );
};

export default Table;

import React, { useState } from "react";
import info from "../assets/info.png";
import deleteIcon from "../assets/delete.png";
import Button from "./Button";
import { formatDate } from "../constants/utils";
import DonationInformation from "./DonationInformation";

const Table = ({ isFetching, isError, data }) => {
  const [openedDonation, setOpenedDonation] = useState();
  const [openDonation, setOpenDonation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 5;

  if (isFetching) return <h1>Fetching donations...</h1>;
  if (isError) return <h1>Sorry, having error fetching donations</h1>;

  const totalPages = Math.ceil(data.length / limitPerPage);
  const startIndex = (currentPage - 1) * limitPerPage;
  const endIndex = startIndex + limitPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleOpenDonation = (index) => {
    setOpenedDonation(paginatedData[index]);
    setOpenDonation(true);
  };

  console.log(openedDonation);

  return (
    <div>
      {openDonation && <DonationInformation donation={openedDonation} setClose={() => setOpenDonation(false)} />}
      <table className="w-full max-w-5xl mx-auto border-collapse">
        <thead>
          <tr className="font-semibold bg-light_primary text-white">
            <th className="p-4 pl-6 text-left">Name</th>
            <th className="p-4 text-left">Date Donated</th>
            <th className="p-4 text-left">Item Donated</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 pr-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((donation, index) => (
            <tr className="h-12 border-b border-gray-300" key={index}>
              <td className="p-4">
                {donation.firstName} {donation.lastName}
              </td>
              <td className="p-4">{formatDate(donation.donated_on)}</td>
              <td className="p-4">{donation.items_donated}</td>
              <td className="p-4">{donation.email}</td>
              <td className="p-4 flex gap-4 items-center justify-center">
                <button onClick={() => handleOpenDonation(index)}>
                  <img src={info} alt="info" className="cursor-pointer" />
                </button>
                <img src={deleteIcon} alt="delete" className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6 gap-3">
        <Button disabled={currentPage === 1} onClick={handlePrev} text="prev" />
        <div className="flex items-center">
          <p>{currentPage}</p>
          <p>/</p>
          <p>{totalPages}</p>
        </div>
        <Button onClick={handleNext} text="next" disabled={currentPage === totalPages} />
      </div>
    </div>
  );
};

export default Table;

import React from "react";

const DonationInformation = ({ setClose, donation }) => {
  return (
    <div className="fixed w-full h-screen bg-primary_grey top-0 left-0 right-0 bg-opacity-50 flex items-center justify-center p-10">
      <div className="bg-white h-full w-full rounded-xl p-8">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Donation's Information </h1>
          <button className="font-bold hover:opacity-50 duration-200" onClick={setClose}>
            &#10005;
          </button>
        </div>
        <div>{JSON.stringify(donation)}</div>
      </div>
    </div>
  );
};

export default DonationInformation;

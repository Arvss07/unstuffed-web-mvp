import React from "react";
import { Input } from "./Input";

const DonationInformation = ({ setClose, donation }) => {
  const photoUrls = donation.items_donated_link.split(",");

  return (
    <div className="fixed w-full h-screen bg-primary_grey top-0 left-0 right-0 bg-opacity-50 flex items-center justify-center p-10">
      <div className="bg-white h-full w-full rounded-xl p-8 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h1 className="font-bold text-2xl">Donation's Information</h1>
          <button 
            className="font-bold hover:opacity-50 duration-200" 
            onClick={setClose}
          >
            &#10005;
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Name
              </label>
              <Input 
                value={`${donation.firstName} ${donation.lastName}`}
                disabled
                className="w-[500px] bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input 
                value={donation.email}
                disabled
                className="w-[500px] bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location
              </label>
              <Input 
                value={donation.user_location}
                disabled
                className="w-[500px] bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Items Donated
              </label>
              <Input 
                value={donation.items_donated}
                disabled
                className="w-[500px] bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drop-off Location
              </label>
              <Input 
                value={donation.ngo.location}
                disabled
                className="w-[500px] bg-drop_bg rounded-full shadow-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Donation Photos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photoUrls.map((url, index) => (
                <div key={index} className="aspect-square">
                  <img 
                    src={url} 
                    alt={`Donated item ${index + 1}`}
                    className="w-[400px] h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationInformation;
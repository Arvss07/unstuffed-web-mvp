import React from "react";
import { supabase } from "../_api/supabaseConfig";
import Button from "./Button";
import { Input } from "./Input";
import ImageCarousel from "../components/ImageCarousel.jsx";

const DonationInformation = ({ setClose, donation }) => {
  
  const photoUrls = donation.items_donated_link.split(",");
  const accepted = donation.accepted_donations.length !== 0;

  const rejectDonation = async () => {
    try{
      const response = await supabase.from('donations').delete().eq('donation_id', donation.donation_id)
    
      console.log(donation.donation_id);
      if(response.error) {
        console.error('Error rejecting donation: ', response.error);
      } else {
        console.log('Donation rejected successfully: ' ,response);
      }
    } catch (error) {
      console.error('Unexpected error: ', error)
    }
  }

  const acceptDonation = async () => {
    try {

      const insert = await supabase.from('accepted_donations').insert(
        {
          donationId: donation.donation_id 
        }
      );

      if(insert.error) {
        console.error('Error inserting into accepted_donations: ', insert.error);
        return;
      }

      window.location.reload()
    } catch {
      console.error('Unexpected error: ', error);
    }
  }

  return (
    <div className="fixed w-full h-screen bg-blue_bg top-0 left-0 right-0 bg-opacity-50 flex items-center justify-center p-10">
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

        <div className="grid grid-cols-2 gap-20 pl-10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue_text mb-1">
                Donor Name
              </label>
              <Input 
                value={`${donation.firstName} ${donation.lastName}`}
                disabled
                className="w-full text-sm bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue_text mb-1">
                Email
              </label>
              <Input 
                value={donation.email}
                disabled
                className="w-full text-sm bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue_text mb-1">
                Pickup Location
              </label>
              <Input 
                value={donation.user_location}
                disabled
                className="w-full text-sm bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue_text mb-1">
                Items Donated
              </label>
              <Input 
                value={donation.items_donated}
                disabled
                className="w-full text-sm bg-drop_bg rounded-full shadow-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue_text mb-1">
                Drop-off Location
              </label>
              <Input 
                value={donation.ngo.location}
                disabled
                className="w-full text-sm bg-drop_bg rounded-full shadow-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue_text mb-3">
              Donation Photos
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex h-[400px]">
              <ImageCarousel images={photoUrls}  />      
                </div>              
              <div className="flex gap-2 items-center w-full">
              {accepted ? <h1 className="text-center font-bold text-xl mt-10">Already Accepted</h1> :
              <>
              <button onClick={rejectDonation} className="bg-dark_grey p-2 px-8 rounded-lg text-white w-[45%]">
                Reject
              </button>
              <button onClick={acceptDonation} className="bg-primary p-2 px-8 rounded-lg text-white w-[45%]">
                Receive
              </button>
              </>
              }
            </div>      
            </div>
     
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationInformation;
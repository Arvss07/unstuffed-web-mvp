import React, { useEffect, useState } from "react";

import { supabase, supabaseAdmin } from "../_api/supabaseConfig";

import donation_hero from "../assets/donation-header.png";
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";

const Donations = () => {
  const [search, setSearch] = useState("");

  const [donations, setDonations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);

      const { data, error } = await supabase.from("donations").select("*,  ngo(*)");
      const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

      const result = data.map((donation) => {
        const user = users.users.find((u) => u.id === donation.donated_by);
        return {
          ...donation,
          email: user.email,
          firstName: user.user_metadata.first_name ? user.user_metadata.first_name : "N/A",
          lastName: user.user_metadata.last_name ? user.user_metadata.last_name : "",
        };
      });

      if (error || usersError) {
        setIsError(true);
        setIsFetching(false);
        return;
      }

      setDonations(result);
      setIsFetching(false);
    };

    fetch();
  }, []);

  const parsedData = donations.filter(
    (donation) =>
      donation.firstName.includes(search) ||
      donation.lastName.includes(search) ||
      donation.items_donated.includes(search) ||
      donation.email.includes(search)
  );

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div>
          <img src={donation_hero} alt="donations" />
        </div>
        <div className="flex flex-col mt-20 gap-10">
          <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} />
          <Table isError={isError} isFetching={isFetching} data={parsedData} />
        </div>
      </div>
    </div>
  );
};

export default Donations;

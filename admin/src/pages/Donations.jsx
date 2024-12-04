import React, { useEffect, useState } from "react";

import { supabase } from "../_api/supabaseConfig";

import donation_hero from "../assets/donation-header.png";
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";
import { data } from "react-router-dom";

const Donations = () => {
  const [search, setSearch] = useState("");

  const [donations, setDonations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);

      const { data, error } = await supabase.from("donations").select(`*, donated_by:auth.users(*)`);

      if (error) {
        setIsError(true);
        setIsFetching(false);
        return;
      }

      setDonations(data);
      setIsFetching(false);
    };

    fetch();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div>
          <img src={donation_hero} alt="donations" />
        </div>
        <div className="flex flex-col mt-20 gap-10">
          <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} />
          <Table isError={isError} isFetching={isFetching} data={donations} />
        </div>
      </div>
    </div>
  );
};

export default Donations;

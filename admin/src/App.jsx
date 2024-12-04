import React, { useEffect, useState } from "react";

import { supabase } from "./_api/supabaseConfig";

const App = () => {
  const [donations, setDonations] = useState();

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from("donations").select();
      console.log(data);
    };

    fetch();
  }, [donations]);

  return <div>App</div>;
};

export default App;

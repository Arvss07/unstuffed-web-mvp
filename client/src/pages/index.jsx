import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, supabaseAdmin } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };

    const fetchDonations = async () => {
      const { data: donations, error: donationsError } = await supabaseAdmin
        .from("donations")
        .select("*");

      if (donationsError) {
        console.error("Error fetching donations:", donationsError);
        return;
      }

      const { data: usersData, error: usersError } =
        await supabaseAdmin.auth.admin.listUsers();

      if (usersError) {
        console.error("Error fetching users:", usersError);
        return;
      }

      const users = usersData.users || [];

      const res = donations.map((donation) => {
        const user = users.find((u) => u.id === donation.donated_by);
        return { ...donation, email: user ? user.email : null };
      });

      console.log(res);
    };

    checkSession();
    fetchDonations();
  }, [navigate]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      {user && (
        <p className="text-xl text-gray-600">
          Welcome, {user.user_metadata.first_name}{" "}
          {user.user_metadata.last_name}!
        </p>
      )}
      <p className="text-xl text-gray-600">
        Unstuffed: Your sustainable marketplace for sharing and donating items
      </p>
    </div>
  );
};

export default Index;

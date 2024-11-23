import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import DonateForm from "../components/DonateForm";
import DonateHero from "../components/DonateHero";

const Donate = () => {
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

    checkSession();
  }, [navigate]);

  return (
    <>
      <div>
        <DonateHero />
        {user && (
          <p className="text-xl text-gray-600 text-center">
            Welcome, {user.user_metadata.first_name}{" "}
            {user.user_metadata.last_name}!
          </p>
        )}
        <DonateForm user={user} />
      </div>
    </>
  );
};

export default Donate;

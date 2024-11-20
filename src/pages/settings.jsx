import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

const Settings = () => {
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
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Settings Section Goes here</h1>
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

export default Settings;

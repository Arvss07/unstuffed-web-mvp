import React from "react";
import DonateForm from "../components/donate/DonateForm";
import DonateHero from "../components/donate/DonateHero";

const Donate = () => {
  return (
    <>
      <div>
        <DonateHero />
        <DonateForm />
      </div>
    </>
  );
};

export default Donate;

import React from "react";

const Button = ({ onClick, text, disabled = false }) => {
  return (
    <button onClick={onClick} className={`bg-primary p-2 px-8 rounded-lg text-white ${disabled && "bg-light_primary"}`} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;

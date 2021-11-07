import React from "react";
import { useAuth } from "../../context/AuthContext";

const Diseases = () => {
  const { authState } = useAuth();

  return authState.user.type === 0 ? (
    <div className="grid">
      <h1>Enfermedades</h1>
    </div>
  )
  :(
    <div className="grid">
      <h1>Enfermedades</h1>
    </div>
  )
};

export default Diseases;

import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminRecomendations from "./AdminRecomendations";


const Recomendations = () => {
  const { authState } = useAuth();
  return authState.user.type===1 ?(
  <AdminRecomendations />
):(
  <div className="grid">
    <h1>Recomendaciones Médicas</h1>
  </div>
);
}
export default Recomendations;

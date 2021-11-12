import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminRecomendations from "./AdminRecomendations";
import UserRecomendations from "./UserRecomendation";


const Recomendations = () => {
  const { authState } = useAuth();
  
  return authState.user.type===1 ?(
  <AdminRecomendations />
):(
  <UserRecomendations />
);
}
export default Recomendations;

import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminRisk from "./AdminRisk";
import UserRisk from "./UserRisk";


const RiskFactors = () => {
  const { authState } = useAuth();
  return authState.user.type===1 ?(
  <AdminRisk />
):(  
  <UserRisk />
);
}
export default RiskFactors;

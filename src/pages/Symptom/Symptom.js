import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSymptom from "./AdminSymptom";
import UserSymptom from "./UserSymptom";


const Symptom = () => {
  const { authState } = useAuth();
  return authState.user.type===1 ?(
  <AdminSymptom />
):(
  <UserSymptom />
);
}
export default Symptom;

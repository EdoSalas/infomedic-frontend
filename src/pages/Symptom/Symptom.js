import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSymptom from "./AdminSymptom";


const Symptom = () => {
  const { authState } = useAuth();
  return authState.user.type===1 ?(
  <AdminSymptom />
):(
  <div className="grid">
    <h1>Sintomas</h1>
  </div>
);
}
export default Symptom;

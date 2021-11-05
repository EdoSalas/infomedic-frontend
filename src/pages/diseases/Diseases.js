import React from "react";
import { Button } from "rbx";
import * as regionService from "../../services/regions.services";

const Diseases = () => {
  const handleClick = async () => {
    const response = await regionService.getAll();
    console.log(response?.data);
  };
  return (
    <div className="grid">
      <h1>Enfermedades</h1>
    </div>
  )
};

export default Diseases;

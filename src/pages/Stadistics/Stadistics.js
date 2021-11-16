import React from "react";

import "../../styles/index.scss";
import ListReports from "./ListReports";

const Stadistics = () => {
 
  return (
    <div className="display-block">
      <h1>Estadísticas</h1>
      <ListReports />
     <div className="stadisticts-container">
      </div> 
    </div>
  )
};

export default Stadistics;

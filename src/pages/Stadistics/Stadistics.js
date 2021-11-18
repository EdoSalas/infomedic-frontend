import React, { useState } from "react";

import "../../styles/index.scss";
import ListReports from "./ListReports";

const Stadistics = () => {
  const [isPresent, setIsPresent] = useState(false);
  return (
    <div className="display-block">
      <h1>Estadísticas</h1>
      <ListReports isPresent={isPresent} setIsPresent={setIsPresent} />
      <div className="stadisticts-container">
      </div>
    </div>
  )
};

export default Stadistics;

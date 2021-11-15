import React from "react";
import AnyChart from 'anychart-react';


const Stadistics = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  return (
    <div className="grid">
      <h1>Estadísticas</h1>
      <AnyChart
      credits={false}
      type="column"
      data={[1, 2, 3, 4]}
      title="Prueba"
      />
     
    </div>
  )
};

export default Stadistics;

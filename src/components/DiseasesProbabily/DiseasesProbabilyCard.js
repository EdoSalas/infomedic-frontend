import React from "react";
import PropTypes from "prop-types";
import { Card } from "rbx";

import "../../styles/index.scss";


const DiseasesProbabilyCard = ({ diseasesList }) => {
  
  return (
    <div className="grid">
      {diseasesList?.map((disease) => (
        <Card
          key={disease.id}
          className="card-content display-flex "
        >
          <div key={disease.id} >
            <h2>{disease.name}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
};
DiseasesProbabilyCard.defaultProps = {
  diseasesList: [],
};
DiseasesProbabilyCard.propTypes = {
    diseasesList: PropTypes.array,
};

export default DiseasesProbabilyCard;

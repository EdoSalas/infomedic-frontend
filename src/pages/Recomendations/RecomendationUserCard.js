import React from "react";
import PropTypes from "prop-types";
import { Card } from "rbx";

import "../../styles/index.scss";


const RecomendationUserCard = ({ recomendationList }) => {
  
  return (
    <div className="grid">
      {recomendationList?.map((recomendation) => (
        <Card
          key={recomendation.id}
          className="card-content display-flex "
        >
          <div key={recomendation.id} >
            <h2>{recomendation.title}</h2>
            <p>{recomendation.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
RecomendationUserCard.defaultProps = {
  diseasesList: [],
};
RecomendationUserCard.propTypes = {
  recomendationList: PropTypes.array,
};

export default RecomendationUserCard;

import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/index.scss"

const DiseasesCard = ({ diseasesList }) => {
  const handleShowInfo =() => {

  }

  return (
    <div className="grid">
      {diseasesList?.map((disease) => (
        <Card
          key={disease.id}
          className="card-content display-flex hover-table-options"
          onClick={() => {
            handleShowInfo(disease.id);
          }}
        >
          <div key={disease.id} >
            <h2>{disease.name}</h2>
            
          </div>
        </Card>
      ))}
    </div>
  );
};
DiseasesCard.defaultProps = {
  diseasesList: [],
};
DiseasesCard.propTypes = {
  diseasesList: PropTypes.array,
};

export default DiseasesCard;

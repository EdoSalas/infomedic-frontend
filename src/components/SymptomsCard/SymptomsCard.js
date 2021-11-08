import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/index.scss";

const SymptomsCard = ({ symptomsList, setSymptomsList }) => {
  
  
  return (
    <div className="grid">
      {symptomsList?.map((symptom) => (
        <Card
          key={symptom.id}
          className="card-content display-flex hover-table-options"
        >
          <div key={symptom.id} >
            <h2>{symptom.name}</h2>
            <p>{symptom.description}</p>
          </div>
          <Icon className="hover-table-options icon-cancel">
              <FontAwesomeIcon
                icon="trash-alt"
                size="1x"
              //  onClick={(e) => handleDeleteDisease(disease, e)}
              />
            </Icon>
        </Card>
      ))}
    </div>
  );
};
SymptomsCard.defaultProps = {
  diseasesList: [],
};
SymptomsCard.propTypes = {
  symptomsList: PropTypes.array,
  setSymptomsList: PropTypes.func.isRequired,
};

export default SymptomsCard;

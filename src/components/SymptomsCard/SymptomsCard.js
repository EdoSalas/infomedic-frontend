import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "../../styles/index.scss";
import {removeSymptomsForDisease} from "../../services/diseases.services"

const SymptomsCard = ({ symptomsList, setSymptomsList, getDiseasesDetails, disease }) => {

  const handleDeleteSymptom= async (symptom, e) =>{
    e.preventDefault();
    e.stopPropagation();
    const param = {
      "symptom": parseInt(symptom.id, 10),
     "disease": parseInt(disease.id, 10)
    }
      const isDeleted = await removeSymptomsForDisease(param);
      if(isDeleted.success){
        toast.success("Síntoma eliminado con éxito!")
        getDiseasesDetails();
      }
  }
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
                onClick={(e) => handleDeleteSymptom(symptom, e)}
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
  disease: PropTypes.object.isRequired,
  symptomsList: PropTypes.array,
  setSymptomsList: PropTypes.func.isRequired,
  getDiseasesDetails:  PropTypes.func.isRequired,
};

export default SymptomsCard;

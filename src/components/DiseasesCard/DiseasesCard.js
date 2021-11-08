import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../context";
import DetailDiseases from "../../pages/Diseases/DetailDiseases";
import {deleteDisease} from "../../services/diseases.services";
import "../../styles/index.scss"
import { toast } from "react-toastify";

const DiseasesCard = ({ diseasesList, setDiseasesList, getDiseases }) => {
  const { setModalOpen } = useModal();

  const handleShowInfo =(e, disease) => {
    e.preventDefault();
    setModalOpen(true, <DetailDiseases disease={disease} setDiseasesList={setDiseasesList} onClose={() => setModalOpen(false)} />);
  }
  const handleDeleteDisease= async (disease, e) =>{
    e.preventDefault();
    e.stopPropagation();
    console.log(disease.id)
      const isDeleted = await deleteDisease(disease.id);
      if(isDeleted.success){
        toast.success("¡Enfermedad eliminada con éxito!")
        getDiseases();
      }
  }
  
  return (
    <div className="grid">
      {diseasesList?.map((disease) => (
        <Card
          key={disease.id}
          className="card-content display-flex hover-table-options"
          onClick={(e) => {
            handleShowInfo(e, disease);
          }}
        >
          <div key={disease.id} >
            <h2>{disease.name}</h2>
            
          </div>
          <Icon className="hover-table-options icon-cancel">
              <FontAwesomeIcon
                icon="trash-alt"
                size="1x"
                onClick={(e) => handleDeleteDisease(disease, e)}
              />
            </Icon>
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
  setDiseasesList: PropTypes.func.isRequired,
  getDiseases: PropTypes.func.isRequired,
};

export default DiseasesCard;

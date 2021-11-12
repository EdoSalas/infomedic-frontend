import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card, Icon, Button } from "rbx";
import { useModal } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {deleteRecomendation} from "../../services/recomendations.services";
import RecomendationDetail from "./RecomendationDetail";
import "../../styles/index.scss";


const RecomendationCard = ({ recomendationList, setRecomendationList,getRecomendations }) => {
    const { setModalOpen } = useModal();

    const handleShowInfo =(e, recomendation) => {
      e.preventDefault();
      setModalOpen(true, <RecomendationDetail recomendation={recomendation} setRecomendationList={setRecomendationList} onClose={() => setModalOpen(false)} />);
    }
  const handleDeleteRecomendation= async (symptom, e) => {
    e.preventDefault();
    e.stopPropagation();
    const deletedSymptom = await deleteRecomendation(symptom.id)
    if(deletedSymptom.success){
        toast.success("Recomendación eliminada con éxito!")
        getRecomendations();
    }
  }
  
  return (
    <div className="grid">
      {recomendationList?.map((recomendation) => (
        <Card
          key={recomendation.id}
          className="card-content display-flex hover-table-options"
          onClick={(e) => {
            handleShowInfo(e, recomendation);
          }}
        >
          <div key={recomendation.id} >
            <h2>{recomendation.title}</h2>
            <p>{recomendation.description}</p>
          </div>
          <Icon className="hover-table-options icon-cancel">
              <FontAwesomeIcon
                icon="trash-alt"
                size="1x"
                onClick={(e) => handleDeleteRecomendation(recomendation, e)}
              />
            </Icon>
        </Card>
      ))}
    </div>
  );
};
RecomendationCard.defaultProps = {
  diseasesList: [],
};
RecomendationCard.propTypes = {
  recomendationList: PropTypes.array,
  setRecomendationList: PropTypes.func.isRequired,
  getRecomendations: PropTypes.func.isRequired,
};

export default RecomendationCard;

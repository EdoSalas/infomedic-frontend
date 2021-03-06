import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Card, Icon } from "rbx";
import { useModal } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteSymptom } from "../../services/symptom.services"
import "../../styles/index.scss";
import DetailSymptom from "../../pages/Symptom/DetailSymptom";

const ListSymptomCard = ({ symptomsList, setSymptomsList, getSymptoms }) => {
  const { setModalOpen } = useModal();

  const handleShowInfo = (e, symptom) => {
    e.preventDefault();
    setModalOpen(true, <DetailSymptom symptom={symptom} setSymptomsList={setSymptomsList} onClose={() => setModalOpen(false)} />);
  }

  const handleDeleteSymptom = async (symptom, e) => {
    e.preventDefault();
    e.stopPropagation();
    const deletedSymptom = await deleteSymptom(symptom.id)
    if (deletedSymptom.success) {
      toast.success("¡Síntoma eliminado con éxito!")
      getSymptoms();
    }
  }

  return (
    <div className="grid">
      {symptomsList?.map((symptom) => (
        <Card
          key={symptom.id}
          className="card-content display-flex hover-table-options"
          onClick={(e) => {
            handleShowInfo(e, symptom);
          }}
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
ListSymptomCard.defaultProps = {
  diseasesList: [],
};
ListSymptomCard.propTypes = {
  symptomsList: PropTypes.array,
  setSymptomsList: PropTypes.func.isRequired,
  getSymptoms: PropTypes.func.isRequired,
};

export default ListSymptomCard;

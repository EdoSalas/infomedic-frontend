import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../context";
// import DetailDiseases from "../../pages/Diseases/DetailDiseases";
import { deleteFactor } from "../../services/riskfactors.services";
import "../../styles/index.scss";
import { toast } from "react-toastify";

const FactorsCard = ({ factorList, setFactorList, getFactors }) => {
  const { setModalOpen } = useModal();

  const handleShowInfo =(e, disease) => {
    e.preventDefault();
 //   setModalOpen(true, <DetailDiseases disease={disease} setDiseasesList={setDiseasesList} onClose={() => setModalOpen(false)} />);
  }
  const handleDeleteFactor= async (factor, e) =>{
    e.preventDefault();
    e.stopPropagation();

      const isDeleted = await deleteFactor(factor.id);
      if(isDeleted.success){
        toast.success("Factor de riesgo eliminado con éxito!")
        getFactors();
      }
  }
  
  return (
    <div className="grid">
      {factorList?.map((factor) => (
        <Card
          key={factor.id}
          className="card-content display-flex hover-table-options"
          onClick={(e) => {
            handleShowInfo(e, factor);
          }}
        >
          <div key={factor.id} >
            <h2>{factor.name}</h2>
            
          </div>
          <Icon className="hover-table-options icon-cancel">
              <FontAwesomeIcon
                icon="trash-alt"
                size="1x"
                onClick={(e) => handleDeleteFactor(factor, e)}
              />
            </Icon>
        </Card>
      ))}
    </div>
  );
};
FactorsCard.defaultProps = {
  diseasesList: [],
};
FactorsCard.propTypes = {
    factorList: PropTypes.array,
  setFactorList: PropTypes.func.isRequired,
  getFactors: PropTypes.func.isRequired,
};

export default FactorsCard;

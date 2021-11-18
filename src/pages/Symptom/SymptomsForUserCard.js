import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "../../styles/index.scss";
import { removeSymptomsForUser } from "../../services/symptomByUser.services"

const SymptomsForUserCard = ({ symptomsList, setSymptomsList, getAllSymptomsForUser, getOptions }) => {

    const handleDeleteSymptomByUser = async (symptom, e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(symptom);

        const param = {
            "id": symptom.pk,
        }
        const isDeleted = await removeSymptomsForUser(param);
        if (isDeleted.success) {
            toast.success("Síntoma eliminado con éxito!")
            getAllSymptomsForUser();
            getOptions();
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
                            onClick={(e) => handleDeleteSymptomByUser(symptom, e)}
                        />
                    </Icon>
                </Card>
            ))}
        </div>
    );
};
SymptomsForUserCard.defaultProps = {
    diseasesList: [],
};
SymptomsForUserCard.propTypes = {
    symptomsList: PropTypes.array,
    setSymptomsList: PropTypes.func.isRequired,
    getAllSymptomsForUser: PropTypes.func.isRequired,
    getOptions: PropTypes.func.isRequired,
};

export default SymptomsForUserCard;

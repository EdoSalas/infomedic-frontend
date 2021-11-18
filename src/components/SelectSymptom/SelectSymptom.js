import React from 'react'
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Select from 'react-select'
import { addSymptomsForUser } from "../../services/symptomByUser.services";
import "../../styles/index.scss";
import { useAuth } from "../../context";

const SelectSymptom = ({ getAllSymptomsUser, symptomsList, list }) => {
    const { authState } = useAuth();

    const handleChange = async (e) => {

        //add new symptom
        const symptomAndUser =
        {
            "user": parseInt(authState.user.id, 10),
            "symptom": parseInt(e.value, 10),
            "date": new Date().toISOString(),

        }
        const res = await addSymptomsForUser(symptomAndUser);
        const data = res;
        if (data.success) {
            toast.success("Síntoma registrado con éxito!")
            getAllSymptomsUser();
        }

    }

    return (
        <div className="content-page">
            <Select className="multi-select" options={list?.selectOptions} onChange={handleChange.bind(this)} placeholder="Buscar síntoma..." />
        </div>
    )
}
SelectSymptom.defaultProps = {
    symptomsList: [],
    list: {},
};
SelectSymptom.propTypes = {
    getAllSymptomsUser: PropTypes.func.isRequired,
    getOptions: PropTypes.func,
    list: PropTypes.object,
};
export default SelectSymptom;


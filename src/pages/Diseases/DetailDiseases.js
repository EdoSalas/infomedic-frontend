import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Control, Input, Button, Icon } from "rbx";
import { useAuth, useModal } from "../../context";
import { getAll as getAllDiseases } from "../../services/diseases.services";
import { getByDisease } from "../../services/symptom.services";
import SymptomsCard from "../../components/SymptomsCard/SymptomsCard";

const DetailDiseases = ({ disease, setDiseasesList }) => {
    const [diseaseChange, setDiseaseChange] = useState({ name: "" });
    const [symptoms, setSymptoms] = useState([]);
    const [edit, setEdit] = useState(false);

    const getDiseases = async () => {
        const diseases = await getAllDiseases()
        if (diseases.success) {
            setDiseasesList(diseases.data)
        }
    }
    const getDiseasesDetails = async () => {
        const symptoms = await getByDisease(disease.id);
        if (symptoms.success) {
            setSymptoms(symptoms?.data?.symptomInfo)
        }
    }
    const handleEdit=(e)=>{
        setEdit(true);
    }
    const handleChange = (name, value) => {
        setDiseaseChange(prev => ({ ...prev, [name]: value }))
    }
    const handleSave = async (e) => {
        e.preventDefault();
        // edit
        /* if (newDisease?.name!=="") {
           const user = await saveDisease(newDisease)
           if (user.success) {
             toast.success("¡Nueva enfermedad registrada!")
             getDiseases(); 
           }
         } */
    }

    useEffect(() => {

        getDiseasesDetails();
        setDiseaseChange(disease);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="display-block" >
            <h1>Detalles</h1>
            <div className="flex content-page">
                <Field className="fields-size2">
                    <Control>
                        <Input disabled={!edit} type="text" name="name"
                            placeholder="Nombre de la enfermedad"
                            value={diseaseChange?.name}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                <Icon className="hover-table-options" size="large">
                    <FontAwesomeIcon icon="edit" onClick={(e)=>handleEdit(e)}/>
                </Icon>
            </div>
            <h2>Síntomas</h2>
            {symptoms?.length > 0 && (
                <SymptomsCard symptomsList={symptoms} setSymptomsList={setSymptoms} />
            )}
        </div>
    );
};
DetailDiseases.defaultProps = {
    diseases: {},
};
DetailDiseases.propTypes = {
    diseases: PropTypes.object,
    setDiseasesList: PropTypes.func.isRequired,
};
export default DetailDiseases;

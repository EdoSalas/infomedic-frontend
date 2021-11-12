import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Control, Input, Icon } from "rbx";
import { getAll as getAllDiseases, updateDisease } from "../../services/diseases.services";
import { getByDisease } from "../../services/symptom.services";
import SymptomsCard from "../../components/SymptomsCard/SymptomsCard";
import MultiSelect from "../../components/MultiSelect/MultiSelect";

const DetailDiseases = ({ disease, setDiseasesList }) => {
   
    const [symptoms, setSymptoms] = useState([]);
    const [edit, setEdit] = useState(false);
    const [diseaseChange, setDiseaseChange] = useState({  name: "" });

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
        // update
         if (diseaseChange?.name!=="") {
           const user = await updateDisease(diseaseChange)
           if (user.success) {
            setEdit(false);
             toast.success("¡Nombre de enfermedad actualizado!")
             getDiseases(); 
            
           }else {
               if(diseaseChange?.name===disease.name){
                toast("¡No se registraron cambios en el nombre de la enfermedad!")
                setEdit(false);
               }else{
                   toast.error("!Ya existe una enfermedad registrada con el nombre suministrado!")
               }
           }
         } 
    }

    useEffect(() => {

        getDiseasesDetails();
        setDiseaseChange({
            id: disease.id,
            name: disease.name,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="display-diseases" >
            <div className="flex content-page">
                <Field className="fields-size2">
                    <Control>
                        <Input disabled={!edit} type="text" name="name"
                            placeholder="Nombre de la enfermedad"
                            value={diseaseChange?.name}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
               {!edit && (
                <Icon className="hover-table-options" size="large">
                <FontAwesomeIcon icon="edit" onClick={(e)=>handleEdit(e)}/>
            </Icon>
               )} 
               {edit && (
                <Icon className="hover-table-options" size="large">
                <FontAwesomeIcon icon="check" onClick={(e)=>handleSave(e)}/>
            </Icon>
               )} 
            </div>
           
            <MultiSelect disease={disease} getDiseasesDetails={getDiseasesDetails} />
            {symptoms?.length > 0 && (
                <SymptomsCard disease={disease} symptomsList={symptoms} getDiseasesDetails={getDiseasesDetails} setSymptomsList={setSymptoms} />
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

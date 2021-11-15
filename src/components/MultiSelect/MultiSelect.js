import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import Select from 'react-select'
import { getAll as getAllSymptoms } from "../../services/symptom.services";
import {addSymptomsForDisease} from "../../services/diseases.services"
import "../../styles/index.scss";

const MultiSelect = ({getDiseasesDetails, disease}) => {
  
   
    const [list, setList] = useState([]);


    const getOptions = async () => {
        const res = await getAllSymptoms()
        const data = res.data

        const options = data.map(d => ({
            "value": d.id,
            "label": d.name
        }))

        setList({ selectOptions: options })
    }

    const handleChange = async(e) => {
      //  setState({ id: e.value, name: e.label })
        //add new symptom
        const symptomAndDisease =
        {
            "disease": parseInt(disease.id,10),
            "symptom": parseInt(e.value,10),
        }
        const res = await addSymptomsForDisease(symptomAndDisease);
        const data = res;
        if(data.success) {
            getDiseasesDetails();
        }
       
    }

    useEffect(() => {
        getOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="content-page">
            <Select className="multi-select" options={list.selectOptions} onChange={handleChange.bind(this)} placeholder="Buscar síntoma..."/>
        </div>
    )
}

MultiSelect.propTypes = {
    getDiseasesDetails: PropTypes.func.isRequired,
    disease: PropTypes.object.isRequired,
};
export default MultiSelect;


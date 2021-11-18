import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Control, Label } from "rbx";
import Select from 'react-select';
import { getAll as getAllSymptom } from "../../services/symptom.services";
import "../../styles/index.scss";
import "../../components/SelectProvince/SelectProvince.scss";

const SelectSymptomDisease = ({ onChange, label, disabled }) => {
    const [symptoms, setDiseases] = useState();


    const getOptions = async () => {
        const res = await getAllSymptom()
        const data = res.data
        const options = data.map(d => ({
            "value": d.id,
            "label": d.name
        })
        )
        setDiseases({ selectOptions: options })
    }
   
    useEffect(() => {

        getOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Control>
            <Label>{""}</Label>
            
                <Select className="multi-select"
                    options={symptoms?.selectOptions}
                    onChange={onChange.bind(this)}
                    placeholder="Buscar síntoma..." />
        </Control>
    );
};

SelectSymptomDisease.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

SelectSymptomDisease.defaultProps = {
    disabled: false,
}

export default SelectSymptomDisease;

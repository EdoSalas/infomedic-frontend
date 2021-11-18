import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Control, Label } from "rbx";
import Select from 'react-select';
import { getAll as getAllDiseases } from "../../services/diseases.services";
import "../../styles/index.scss";
import "../../components/SelectProvince/SelectProvince.scss";

const SelectDisease = ({ value, name, onChange, label, disabled }) => {
    const [diseases, setDiseases] = useState();


    const getOptions = async () => {
        const res = await getAllDiseases()
        const data = res.data
        const options = data.map(d => ({
            "value": d.id,
            "label": d.name
        })
        )
        setDiseases({ selectOptions: options })
    }
    console.log(diseases)
    useEffect(() => {

        getOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Control>
            <Label>{""}</Label>
            
                <Select className="multi-select"
                    options={diseases?.selectOptions}
                    onChange={onChange.bind(this)}
                    placeholder="Buscar enfermedad..." />
        </Control>
    );
};

SelectDisease.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

SelectDisease.defaultProps = {
    disabled: false,
}

export default SelectDisease;

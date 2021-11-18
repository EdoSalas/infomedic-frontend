import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Control, Label } from "rbx";
import Select from 'react-select';
import { getAll as getAllFactor } from "../../services/riskfactors.services";
import "../../styles/index.scss";
import "../../components/SelectProvince/SelectProvince.scss";

const SelectFactorDemo = ({ onChange, label, disabled }) => {
    const [factors, setFactors] = useState();

    const getOptions = async () => {
        const res = await getAllFactor()
        const data = res.data
        const options = data.map(d => ({
            "value": d.id,
            "label": d.name
        })
        )
        setFactors({ selectOptions: options })
    }
    useEffect(() => {

        getOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Control>
            <Label>{""}</Label>
            
                <Select className="multi-select"
                    options={factors?.selectOptions}
                    onChange={onChange.bind(this)}
                    placeholder="Buscar factor de riesgo..." />
        </Control>
    );
};

SelectFactorDemo.propTypes = {
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

SelectFactorDemo.defaultProps = {
    disabled: false,
}

export default SelectFactorDemo;

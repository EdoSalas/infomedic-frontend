import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Select, Control, Label } from "rbx";
import { getAll as getAllProvinces } from "../../services/provinces.services";
import "../../styles/index.scss";
import "./SelectProvince.scss";

const SelectProvince = ({ value, name, onChange, label, disabled }) => {
  const [provinces, setProvinces] = useState();

  const getProvinces = async () => {
    const dataProvince = await getAllProvinces()
    if(dataProvince.success){
      setProvinces(dataProvince.data)
    }
  }
  useEffect(() => {
    
    getProvinces();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Control>
      <Label>{label}</Label>
      <Select.Container fullwidth>
        <Select
          className="selector"
          disabled = { disabled}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        >
          {provinces?.map((province) => (
            <Select.Option key={province.id} value={province.id}>
              {province.name}
            </Select.Option>
          ))}
        </Select>
      </Select.Container>
    </Control>
  );
};

SelectProvince.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

SelectProvince.defaultProps = {
disabled : false,
}

export default SelectProvince;

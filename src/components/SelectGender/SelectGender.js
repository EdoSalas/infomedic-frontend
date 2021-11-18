import React from "react";
import PropTypes from "prop-types";
import { Select, Control, Label } from "rbx";
import "../../styles/index.scss";
import "../SelectProvince/SelectProvince.scss";

const SelectGender = ({ value, name, onChange, label, disabled }) => {
  const genders = [{ name: "Femenino", value: "F" }, { name: "Masculino", value: "M" }];

  return (
    <Control>
      <Label>{label}</Label>
      <Select.Container fullwidth>
        <Select
          className="selector"
          disabled={disabled}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        >
          {genders?.map((index) => (
            <Select.Option key={index.value} value={index.value}>
              {index.name}
            </Select.Option>
          ))}
        </Select>
      </Select.Container>
    </Control>
  );
};

SelectGender.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

SelectGender.defaultProps = {
  disabled: false,
}

export default SelectGender;

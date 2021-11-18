import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Select, Control, Label } from "rbx";
import { getAll as getAllRegions } from "../../services/regions.services";
import "../../styles/index.scss";
import "../../components/SelectProvince/SelectProvince.scss";

const SelectRegion = ({ value, name, onChange, label, disabled }) => {
  const [regions, setRegions] = useState();

  const getProvinces = async () => {
    const dataRegions = await getAllRegions()
    if (dataRegions.success) {
      setRegions(dataRegions.data)
    }
  }
  useEffect(() => {

    getProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
          {regions?.map((region) => (
            <Select.Option key={region.id} value={region.id}>
              {region.name}
            </Select.Option>
          ))}
        </Select>
      </Select.Container>
    </Control>
  );
};

SelectRegion.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

SelectRegion.defaultProps = {
  disabled: false,
}

export default SelectRegion;

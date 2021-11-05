import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Select, Control, Label } from "rbx";
import { getCantonesByIdProvince } from "../../services/cantones.services";
import "../../styles/index.scss";
import "../SelectProvince/SelectProvince.scss";

const SelectCanton = ({ value, name, onChange, label, disabled, idProvince }) => {
  const [cantones, setCantones] = useState([]);

  const getCantones = async () => {
    const dataCantones = await getCantonesByIdProvince(idProvince)
    if (dataCantones.success) {
      setCantones(dataCantones.data)
    }
  }
  useEffect(() => {
    if (idProvince !== "") { setCantones([]); getCantones(); }
  }, [idProvince])

  return idProvince === "" ? (
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
          <Select.Option value="">
            Sin Seleccionar
          </Select.Option>
        </Select>
      </Select.Container>
    </Control>
  )
    : (
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
            <Select.Option value="">
              Sin Seleccionar
            </Select.Option>
            {
              cantones?.map((canton) => (
                <Select.Option key={canton.id} value={canton.id}>
                  {canton.name}
                </Select.Option>
              ))}
          </Select>
        </Select.Container>
      </Control>
    );
};

SelectCanton.propTypes = {
  onChange: PropTypes.func.isRequired,
  idProvince: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

SelectCanton.defaultProps = {
  disabled: false,
}

export default SelectCanton;

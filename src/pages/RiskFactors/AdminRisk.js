import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Field, Control, Input, Button } from "rbx";
import { getAll as getAllFactors, saveFactor } from "../../services/riskfactors.services";
import FactorsCard from "../../components/FactorsCard";
import "../../styles/index.scss"

const AdminRisk = () => {

  const [newFactor, setNewFactor] = useState({
    name: ""
  })
  const [factorList, setFactorList] = useState([]);


  const getFactors = async () => {
    const diseases = await getAllFactors()
    if (diseases.success) {
      setFactorList(diseases.data)
    }
  }

  const handleChange = (name, value) => {
    setNewFactor(prev => ({ ...prev, [name]: value }))
  }
  const handleSave = async (e) => {
    e.preventDefault();
    if (newFactor?.name !== "") {
      const user = await saveFactor(newFactor)
      if (user.success) {
        toast.success("¡Nuevo factor de riesgo registrado!")
        setNewFactor({
          name: "",
        })
        getFactors();
      }
    } else {
      toast.error("¡El nombre del factor de riesgo es obligatorio!")
    }
  }

  useEffect(() => {

    getFactors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="display-block" >
      <h1>Factores de riesgo</h1>
      <Field className="fields-size">
        <Control>
          <Input type="text"
            maxLength="45"
            name="name"
            placeholder="Factor de riesgo"
            value={newFactor.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)} />
        </Control>
      </Field>
      <Button className="button-size" type="button" color="primary" onClick={(e) => handleSave(e)}>Registrar </Button>
      {factorList?.length > 0 && (
        <FactorsCard factorList={factorList} setFactorList={setFactorList} getFactors={getFactors} />
      )}
    </div>
  );
};

export default AdminRisk;

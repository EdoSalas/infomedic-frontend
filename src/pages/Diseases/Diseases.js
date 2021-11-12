import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Field, Control, Input, Button } from "rbx";
import { saveDisease, getAll as getAllDiseases } from "../../services/diseases.services";
import DiseasesCard from "../../components/DiseasesCard/DiseasesCard";
import "../../styles/index.scss"

const Diseases = () => {

  const [newDisease, setNewDisease] = useState({
    name: ""
  })
  const [diseasesList, setDiseasesList] = useState([]);


  const getDiseases = async () => {
    const diseases = await getAllDiseases()
    if (diseases.success) {
      setDiseasesList(diseases.data)
    }
  }

  const handleChange = (name, value) => {
    setNewDisease(prev => ({ ...prev, [name]: value }))
  }
  const handleSave = async (e) => {
    e.preventDefault();
    if (newDisease?.name !== "") {
      const user = await saveDisease(newDisease)
      console.log(user)
      if (user.success) {
        toast.success("¡Nueva enfermedad registrada!")
        setNewDisease({
          name: "",
        })
        getDiseases();
      }
    } else {
      toast.error("¡El nombre de la enfermedad es obligatorio!")
    }
  }

  useEffect(() => {

    getDiseases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="display-block" >
      <h1>Enfermedades</h1>
      <Field className="fields-size">
        <Control>
          <Input type="text" name="name"
            placeholder="Nombre de la enfermedad"
            value={newDisease.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)} />
        </Control>
      </Field>
      <Button className="button-size" type="button" color="primary" onClick={(e) => handleSave(e)}>Registrar </Button>
      {diseasesList?.length > 0 && (
        <DiseasesCard diseasesList={diseasesList} setDiseasesList={setDiseasesList} getDiseases={getDiseases} />
      )}
    </div>
  );
};

export default Diseases;

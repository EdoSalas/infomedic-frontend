import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import {Field, Control, Input, Button} from "rbx";
import { useAuth } from "../../context/AuthContext";
import {saveDisease, getAll as getAllDiseases} from "../../services/diseases.services";
import DiseasesCard from "../../components/DiseasesCard/DiseasesCard";

const Diseases = () => {
  const { authState } = useAuth();
  const [newDisease, setNewDisease] = useState({ 
    name: ""
  })
  const [diseasesList, setDiseasesList] = useState([]);
 
  const getDiseases = async () => {
    const diseases = await getAllDiseases()
    if(diseases.success){
      setDiseasesList(diseases.data)
    }
  }
  
  const handleChange = (name, value) => {
    setNewDisease(prev => ({ ...prev, [name]: value }))
  }
  console.log(diseasesList)
  const handleSave = async (e) => {
    e.preventDefault();
    if (newDisease?.name!=="") {
      const user = await saveDisease(newDisease)
      if (user.success) {
        toast.success("¡Nueva enfermedad registrada!")
      }
    } 
  }

  useEffect(() => {
    
    getDiseases();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return authState.user.type === 0 ? (
    <div className="">
      <h1>Enfermedades</h1>
    </div>
  )
  :(
    <div className="display-block">
      <h1>Enfermedades</h1>
      <div className="flex content-page">
      <Field className="fields-size">
      <Control>
      <Input type="text" name="name"
       placeholder="Nombre de la enfermedad"
       value={newDisease.name}  
       onChange={(e)=>handleChange(e.target.name, e.target.value)}/>
      </Control>
      </Field>
      <Button className="button-size" type="button" color="primary" onClick={(e)=>handleSave(e)}>Agregar </Button>
      </div>
      {diseasesList?.length > 0 && (
        <DiseasesCard diseasesList={diseasesList} />
      )}
    </div>
  )
};

export default Diseases;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Field, Control, Input, Button } from "rbx";
import { saveSymptom, getAll as getAllSymptom } from "../../services/symptom.services"
import "../../styles/index.scss"
import ListSymptomCard from "./ListSymptomCard";

const AdminSymptom = () => {

    const [newSymptom, setNewSymptom] = useState({
        name: "",
        description: "",
    })
    const [symptomList, setSymptomList] = useState([]);


    const getSymptoms = async () => {
        const diseases = await getAllSymptom()
        if (diseases.success) {
            setSymptomList(diseases.data)
        }
    }

    const handleChange = (name, value) => {
        setNewSymptom(prev => ({ ...prev, [name]: value }))
    }
    const handleSave = async (e) => {
        e.preventDefault();
        if (newSymptom?.name !== "") {
            const symptomResponse = await saveSymptom(newSymptom)
            console.log(symptomResponse);

            if (symptomResponse.success) {
                toast.success("¡Nuevo síntoma registrado!")
                setNewSymptom({
                    name: "",
                    description: "",
                })
                getSymptoms();
            }
        } else {
            toast.error("¡El nombre del síntoma es obligatorio!")
        }
    }

    useEffect(() => {

        getSymptoms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="display-block" >
            <h1>Síntomas</h1>
            <Field className="fields-size">
                <Control>
                    <Input type="text"
                        maxLength="45"
                        name="name"
                        placeholder="Síntoma"
                        value={newSymptom.name}
                        onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </Control>
            </Field>
            <Field className="fields-size">
                <Control>
                    <Input type="text"
                        maxLength="200"
                        name="description"
                        placeholder="Descripción"
                        value={newSymptom.description}
                        onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </Control>
            </Field>
            <Button className="button-size " type="button" color="primary" onClick={(e) => handleSave(e)}>Registrar </Button>

            {symptomList?.length > 0 && (
                <ListSymptomCard symptomsList={symptomList} getSymptoms={getSymptoms} setSymptomsList={setSymptomList} />
            )}
        </div>
    );
};

export default AdminSymptom;

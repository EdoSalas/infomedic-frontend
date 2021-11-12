import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Control, Input, Icon, Textarea } from "rbx";
import { getAll as getAllSymptoms, updateSymptom } from "../../services/symptom.services";

const FactorDetails = ({ symptom, setSymptomsList, onClose }) => {

    const [edit, setEdit] = useState(false);
    const [symptomChange, setSymptomChange] = useState({ name: "", description: "" });

    const getDiseases = async () => {
        const diseases = await getAllSymptoms()
        if (diseases.success) {
            setSymptomsList(diseases.data)
        }
    }

    const handleEdit = (e) => {
        setEdit(true);
    }
    const handleChange = (name, value) => {
        setSymptomChange(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async (e) => {
        e.preventDefault();
        // update
        if (symptomChange?.name !== "") {
            const user = await updateSymptom(symptomChange)
            if (user.success) {
                setEdit(false);
                toast.success("¡Síntoma actualizado!")
                getDiseases();
                onClose();

            } else {
                if (symptomChange?.name === symptom.name && symptomChange?.description === symptom.description) {
                    console.log()
                    toast("¡No se registraron cambios en el síntoma!")
                    setEdit(false);
                } else {
                    toast.error("!Ya existe un síntoma registrado con el nombre suministrado!")
                }
            }
        }
    }

    useEffect(() => {

        setSymptomChange({
            id: symptom.id,
            name: symptom.name,
            description: symptom.description,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div >
            <div className=" content-page">

                <div className="flex">
                    <Field className="fields-size2">
                        <Control>
                            <Input disabled={!edit} type="text" name="name"
                                placeholder="Nombre de la enfermedad"
                                value={symptomChange?.name}
                                onChange={(e) => handleChange(e.target.name, e.target.value)} />
                        </Control>
                    </Field>
                    {!edit && (
                        <Icon className="hover-table-options" size="large">
                            <FontAwesomeIcon icon="edit" onClick={(e) => handleEdit(e)} />
                        </Icon>
                    )}
                    {edit && (
                        <Icon className="hover-table-options" size="large">
                            <FontAwesomeIcon icon="check" onClick={(e) => handleSave(e)} />
                        </Icon>
                    )}
                </div>
                <Field className="fields-size2">
                    <Control>
                        <Textarea disabled={!edit} type="text" name="description"
                            placeholder="Descripción"
                            value={symptomChange?.description}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
            </div>

        </div>
    );
};
FactorDetails.defaultProps = {
};
FactorDetails.propTypes = {
    symptom: PropTypes.object,
    setSymptomsList: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default FactorDetails;

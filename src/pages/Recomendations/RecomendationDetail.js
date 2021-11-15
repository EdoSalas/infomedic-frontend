import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Control, Input, Icon, Textarea } from "rbx";
import { getAll as getAllRecomendation, updateRecomendation } from "../../services/recomendations.services";


const RecomendationDetail = ({ recomendation, setRecomendationList, onClose }) => {


    const [edit, setEdit] = useState(false);
    const [recomendationChange, setRecomendationChange] = useState({ title: "", description: "" });

    const getFactors = async () => {
        const factors = await getAllRecomendation();
        if (factors.success) {
            setRecomendationList(factors.data)
        }
    }

    const handleEdit = (e) => {
        setEdit(true);
    }
    const handleChange = (name, value) => {
        setRecomendationChange(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async (e) => {
        e.preventDefault();
        // update
        if (recomendationChange?.name !== "") {
            const user = await updateRecomendation(recomendationChange)
            if (user.success) {
                setEdit(false);
                toast.success("Recomendación actualizada!")
                getFactors();
                onClose();
            } else {
                if (recomendationChange?.name === recomendation.name && recomendationChange?.description === recomendation.description) {
                    toast("¡No se registraron cambios en el factor!")
                    setEdit(false);
                } else {
                    toast.error("!Ya existe una recomendación registrada con el nombre suministrado!")
                }
            }
        }
    }

    useEffect(() => {

        setRecomendationChange({
            id: recomendation.id,
            title: recomendation.title,
            description: recomendation.description,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div >
            <div className=" content-page">
                <div className="flex">
                    <Field className="fields-size2">
                        <Control>
                            <Input disabled={!edit} type="text"
                            maxLength="45"
                            name="title"
                                placeholder="Nombre"
                                value={recomendationChange?.title}
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
                        <Textarea disabled={!edit} type="text" 
                        maxLength="200"
                        name="description"
                            placeholder="Descripción"
                            value={recomendationChange?.description}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>

            </div>

        </div>
    );
};
RecomendationDetail.defaultProps = {
};
RecomendationDetail.propTypes = {
    recomendation: PropTypes.object,
    setRecomendationList: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default RecomendationDetail;

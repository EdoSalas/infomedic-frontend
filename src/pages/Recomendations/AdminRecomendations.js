import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Field, Control, Input, Button, Textarea } from "rbx";
import {getAll as getAllRecomendations, saveRecomendation } from "../../services/recomendations.services";
import "../../styles/index.scss"
import RecomendationCard from "./RecomendationCard";

const AdminRecomendations = () => {

    const [newRecomendation, setNewRecomendation] = useState({
        title: "",
        description: "",
    })
    const [recomendationList, setRecomendationList] = useState([]);


    const getRecomendations = async () => {
        const recomendations = await getAllRecomendations()
        if (recomendations.success) {
            setRecomendationList(recomendations.data)
        }
    }

    const handleChange = (name, value) => {
        setNewRecomendation(prev => ({ ...prev, [name]: value }))
    }
    const handleSave = async (e) => {
        e.preventDefault();
        if (newRecomendation?.name !== "") {
            const user = await saveRecomendation(newRecomendation)
            if (user.success) {
                toast.success("¡Nuevo síntoma registrado!")
                setNewRecomendation({
                    title: "",
                    description: "",
                })
                getRecomendations();
            }
        } else {
            toast.error("¡El título de la recomendación es obligatorio!")
        }
    }

    useEffect(() => {

        getRecomendations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="display-block" >
            <h1>Síntomas</h1>
            <Field className="fields-size">
                    <Control>
                        <Input type="text" name="title"
                            placeholder="Recomendación"
                            value={newRecomendation.title}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                <Field className="fields-size">
                <Control>
                    <Textarea className="text-size"  type="text" name="description"
                        placeholder="Descripción"
                        value={newRecomendation.description}
                        onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </Control>
            </Field>
            <Button className="button-size " type="button" color="primary" onClick={(e) => handleSave(e)}>Registrar </Button>
        
            {recomendationList?.length > 0 && (
                <RecomendationCard recomendationList={recomendationList} getRecomendations={getRecomendations} setRecomendationList={setRecomendationList} />
            )}
        </div>
    );
};

export default AdminRecomendations;

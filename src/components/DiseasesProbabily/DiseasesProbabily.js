import React, { useState, useEffect } from "react";
import "../../styles/index.scss"
import DiseasesProbabilyCard from "./DiseasesProbabilyCard";
import { getByUser } from "../../services/diseases.services";
import { useAuth } from "../../context";


const DiseasesProbabily = () => {
    const { authState } = useAuth();
    const [diseasesList, setDiseasesList] = useState([]);


    const getDiseasesOfUser = async () => {
        const param = {
            "user": authState?.user?.idNumber,
        };
        const recomendations = await getByUser(param)
        if (recomendations.success) {
            setDiseasesList(recomendations?.data?.diseases)
        }
    }


    useEffect(() => {

        getDiseasesOfUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="display-block" >
            <h1>Posibles enfermedades según los síntomas Registrados</h1>
            <h3 className="leyendas">Aclaración: La información aquí brindada es solo una probabilidad de poseer una enfermedad según los síntomas registrados.
                La enfermedad o lista de enfermedades que se muestran a continuación se caculan por la presentación de un mínimo de 75% de los síntomas totales de cada enfermedad.</h3>

            {diseasesList?.length > 0 && (
                <DiseasesProbabilyCard diseasesList={diseasesList} />
            )}
            {diseasesList?.length === 0 && (
                <div className="card-content">
                    <p>No hay enfermedades relacionadas.</p>
                </div>

            )}

        </div>
    );
};

export default DiseasesProbabily;

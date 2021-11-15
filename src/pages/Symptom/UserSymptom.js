import React, { useState, useEffect } from "react";
import { Button } from "rbx";
import { getByUser } from "../../services/symptom.services";
import { getAll as getAllSymptoms } from "../../services/symptom.services";
import { useAuth, useModal } from "../../context";
import SelectSymptom from "../../components/SelectSymptom/SelectSymptom";
import SymptomsForUserCard from "./SymptomsForUserCard";
import DiseasesProbabily from "../../components/DiseasesProbabily/DiseasesProbabily";

const UserSymptoms = () => {
    const { setModalOpen } = useModal();
    const { authState } = useAuth();
    const [symptomsList, setSymptomsList] = useState([]);

    const [list, setList] = useState([]);

    const getOptions = async () => {
        const res = await getAllSymptoms()
        const data = res.data
        const options = data.map(d => ( {
                "value": d.id,
                "label": d.name
            })  
        )
        const filterOptions = options.filter((op) => !(symptomsList?.find((index) => index.id === op.value)))
        setList({ selectOptions: filterOptions })
    }
    const getAllSymptomsUser = async () => {
        const symptoms = await getByUser(authState.user.id)
        if (symptoms.success) {
            setSymptomsList(symptoms.data.symptomInfo)
        }
    }
    const handleShowInfo = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setModalOpen(true, <DiseasesProbabily  onClose={() => setModalOpen(false)} />);

    }
    useEffect(() => {

        getAllSymptomsUser();
        getOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getOptions();
    },[symptomsList])

    return (
        <div className="display-block" >
            <h1>Síntomas</h1>
            <h3 className="leyendas">Los síntomas aquí registrados serán eliminados automáticamente después de una semana apartir del día del registro.
            Si aún continúa con el síntoma; favor volver a registrarlo.</h3>
            <Button color="primary" onClick={(e) => handleShowInfo(e)}>Ver enfermedades relacionadas</Button>
            {list?.selectOptions?.length > 0 && (
                <SelectSymptom getAllSymptomsUser={getAllSymptomsUser} symptomsList={symptomsList} list={list} />
            )}
            {symptomsList?.length > 0 && (
                
                <SymptomsForUserCard symptomsList={symptomsList} setSymptomsList={setSymptomsList} getAllSymptomsForUser={getAllSymptomsUser} getOptions={getOptions}/>
                
            )}

        </div>
    );
};

export default UserSymptoms;

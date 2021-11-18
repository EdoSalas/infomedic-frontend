import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Title, Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";
import SelectRegion from "../Demographics/RegionCard";
import { symptomsForDisease } from "../../services/report.services"
import CanvaReportOne from "../Canvas/CanvaReport0ne";
import Tables from "../Tables/Tables";
import SelectDisease from "../SelectDisease/SelectDisease";


const ReportTwo = ({ setIsPresent }) => {
    const [rango, setRango] = useState({
        disease: 0,
    });
    const [data, setData] = useState([])
    const [title, setTitle] = useState({})
    const [titleTable, setTitleTable] = useState({})
    const [vacio, setVacio] = useState(false);

    const handleChange = (e) => {
        setRango(prev => ({ ...prev, disease: e.value }))
    }
    const handleGenerar = async (e) => {
        e.preventDefault();
        if(rango?.disease === 0){
            toast.error("Debe seleccionar una enfermedad")
        }else{
            const result = await symptomsForDisease(rango)
            if (result?.success) {
    
                 setTitle({
                     title: ``,
                 })
                 setTitleTable("Síntomas de la enfermedad")
                 setData(result?.data?.map((index) => ({
                    id: index.id,
                    name: index.name,
                 }))); 
    
            }
            setVacio(true);
        }
        

    }
    const handleCancel = (e) => {
        e.preventDefault();
        setIsPresent(false);
    }
    const validateGenerate = () => {
        console.log(rango.disease)
        if (rango.disease !== 0) {
            return false;
        }
        return true;
    }
    return (
        <div className="display-block">
            <div className="stadisticts-container">

                <Field>
                    <Control>
                        <SelectDisease label="Enfermedad:" name="disease" value={rango.disease} onChange={handleChange} />
                    </Control>
                </Field>

                <Button disabled={validateGenerate()} color="primary" onClick={(e) => handleGenerar(e)}>Generar</Button>
                <Button color="secondary" onClick={(e) => handleCancel(e)}>Cancelar</Button>
                {data.length > 0 && (
                    <div className="animate__animated animate__bounceInLeft">
                        <h3 className="color-title">{title.title}</h3>
                        <Tables dataList={data} title={titleTable} />
                    </div>

                )}
                {vacio && data.length === 0 && (
                    <div className="animate__animated animate__pulse">
                        <p>No existen datos registrados para esa enfermedad</p>
                    </div>

                )}
            </div>
        </div>
    )
};

ReportTwo.propTypes = {
    setIsPresent: PropTypes.func.isRequired,
};

export default ReportTwo;


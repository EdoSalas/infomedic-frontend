import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Title, Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";
import { edadesAfectadas } from "../../services/report.services"
import CanvaReportOne from "../Canvas/CanvaReport0ne";


const ReportTen = ({ setIsPresent }) => {
    const [rango, setRango] = useState({
        inicio: "",
        fin: "",
    });
    const [data, setData] = useState([]);
    const [amounts, setAmounts] = useState(0)
    const [tick, setTick] = useState([]);
    const [tickF, setTickF] = useState([]);
    const [labelx, setLabelx] = useState([]);
    const [labely, setLabely] = useState([]);
    const [orientationx, setOrientationx] = useState([]);
    const [orientationy, setOrientationy] = useState([]);
    const [vacio, setVacio] = useState(false);

    const handleChange = (name, value) => {
        setRango(prev => ({ ...prev, [name]: value }))
    }
    const handleGenerar = async (e) => {
        e.preventDefault();
        if (rango.fin < rango.inicio) {
            toast.error("La fecha de inicio debe ser anterior a la de fin")
        } else {
            const param = {
                "initDate": rango.inicio,
                "finalDate": rango.fin,
            }
            const result = await edadesAfectadas(param)
            if (result.success) {
                //  data, tick, labelx, labely, orientationx, orientationy
                if (result.data.length > 0) {
                    setData(result.data.map((index) => ({
                        edad: index?.Age,
                        sintomas: parseInt(index?.Affected,10),
                    })))
                    
                    setTick(result.data.map((index) =>{
                        return index.Age
                    }));
                    setTickF(result.data.map((index) =>{
                        return index.Age
                    }));
                    let d=0;
                    result.data.forEach((index) =>{
                       d+=parseInt(index.Affected,10);
                    })
                    setAmounts(d)
                    setLabelx("Edades");
                    setLabely("Cantidad de Síntomas")
                    setOrientationx("edad");
                    setOrientationy("sintomas");
                    
                }
               
            }
            setVacio(true);
        }
    }
    const validateGenerate = () => {
        if (rango.inicio !== "" && rango.fin !== "") {
            return false;
        }
        return true;
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setIsPresent(false);
    }

    return (
        <div className="display-block">
            <div className="stadisticts-container">

                <h3>Rango de fechas:</h3>
                <Field>
                    <Control>
                        <Label>Inicio:</Label>
                        <Input type="date" name="inicio" placeholder="Fecha de inicio:" value={rango.inicio}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Label>Fin:</Label>
                        <Input type="date" name="fin" placeholder="Fecha de inicio:" value={rango.fin}
                            onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </Control>
                </Field>
                <Button disabled={validateGenerate()} color="primary" onClick={(e) => handleGenerar(e)}>Generar</Button>
                <Button color="secondary" onClick={(e) => handleCancel(e)}>Cancelar</Button>
                {data.length > 0 && amounts>0 && (
                    <CanvaReportOne axis={false} data={data} tick={tick} tickF={tickF} labelx={labelx} labely={labely} orientationx={orientationx} orientationy={orientationy} horizontal={false}/>
                )}
                {vacio && amounts===0 && (
                    <div className="animate__animated animate__pulse">
                    <p>No existen datos registrados en ese rango de fechas</p>
                    </div>
                   
                )}

                
            </div>
        </div>
    )
};

ReportTen.propTypes = {
    setIsPresent: PropTypes.func.isRequired,
};

export default ReportTen;


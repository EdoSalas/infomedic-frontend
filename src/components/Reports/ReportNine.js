import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";
import { sintomasPorGenero } from "../../services/report.services"
import CanvaReportOne from "../Canvas/CanvaReport0ne";
import SelectRegion from "../Demographics/RegionCard";


const ReportNine = ({ setIsPresent }) => {
    const [rango, setRango] = useState({
        inicio: "",
        fin: "",
        region: 1,
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
    console.log(data, "data")
    const handleGenerar = async (e) => {
        e.preventDefault();
        if (rango.fin < rango.inicio) {
            toast.error("La fecha de inicio debe ser anterior a la de fin")
        } else {
            const param = {
                "region": rango.region,
                "initDate": rango.inicio,
                "finalDate": rango.fin,
            }
            const result = await sintomasPorGenero(param)
            if (result.success) {
                //  data, tick, labelx, labely, orientationx, orientationy

                if (result.data !== "") {
                    setData([{
                        genero: "Masculino",
                        sintomas: parseInt(result.data?.Masculino, 10),
                    },
                    {
                        genero: "Femenino",
                        sintomas: parseInt(result.data?.Femenino, 10),
                    },

                    ])

                    setTick(["Masculino", "Femenino"]);
                    setTickF(["Masculino", "Femenino"]);
                    let d = 0;

                    d += parseInt(result.data?.Masculino, 10);
                    d += parseInt(result.data?.Femenino, 10);
                    setAmounts(d)
                    setLabelx("G??nero");
                    setLabely("S??ntomas")
                    setOrientationx("genero");
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
                <Field>
                    <Control>
                        <SelectRegion label="Regi??n:" name="region" value={rango.region} onChange={handleChange} />
                    </Control>
                </Field>
                <Button disabled={validateGenerate()} color="primary" onClick={(e) => handleGenerar(e)}>Generar</Button>
                <Button color="secondary" onClick={(e) => handleCancel(e)}>Cancelar</Button>
                {data.length > 0 && amounts > 0 && (
                    <CanvaReportOne axis={false} data={data} tick={tick} tickF={tickF} labelx={labelx} labely={labely} orientationx={orientationx} orientationy={orientationy} horizontal={false} />
                )}
                {vacio && amounts === 0 && (
                    <div className="animate__animated animate__pulse">
                        <p>No existen s??ntomas registrados en ese rango de fechas</p>
                    </div>

                )}


            </div>
        </div>
    )
};

ReportNine.propTypes = {
    setIsPresent: PropTypes.func.isRequired,
};

export default ReportNine;


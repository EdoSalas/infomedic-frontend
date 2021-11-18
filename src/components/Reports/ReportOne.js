import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";
import SelectRegion from "../Demographics/RegionCard";
import { diseasesForRegions } from "../../services/report.services"
import Tables from "../Tables/Tables";

const ReportOne = ({ setIsPresent }) => {
    const [rango, setRango] = useState({
        inicio: "",
        fin: "",
        region: 1,
    });
    const [data, setData] = useState([])
    const [title, setTitle] = useState({})
    const [titleTable, setTitleTable] = useState({})
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
                "region": rango.region,
                "initDate": rango.inicio,
                "finalDate": rango.fin,
            }
            const result = await diseasesForRegions(param)
            if (result?.success) {

                setTitle({
                    title: `Región: ${result?.data?.region?.name}`,
                })
                setTitleTable("Posibles Enfermedades")
                setData(result?.data?.diseases.map((index) => ({
                    id: index.id,
                    name: index.name,
                })));

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
                        <SelectRegion label="Región:" name="region" value={rango.region} onChange={handleChange} />
                    </Control>
                </Field>

                <Button disabled={validateGenerate()} color="primary" onClick={(e) => handleGenerar(e)}>Generar</Button>
                <Button color="secondary" onClick={(e) => handleCancel(e)}>Cancelar</Button>
                {data.length > 0 && (
                    <div className="animate__animated animate__bounceInLeft">
                        <h3 className="color-title">{""}</h3>
                        <h3 className="color-title">{title.title}</h3>
                        <Tables dataList={data} title={titleTable} />
                    </div>

                )}
                {vacio && data.length === 0 && (
                    <div className="animate__animated animate__pulse">
                        <p>No existen datos registrados de posibles enfermedades en ese rango de fechas y región</p>
                    </div>

                )}
            </div>
        </div>
    )
};

ReportOne.propTypes = {
    setIsPresent: PropTypes.func.isRequired,
};

export default ReportOne;


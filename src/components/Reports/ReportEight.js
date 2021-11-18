import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Field, Control, Button } from "rbx";
import "../../styles/index.scss";
import { riskForProvince } from "../../services/report.services"
import Tables from "../Tables/Tables";
import SelectFactorDemo from "../SelectDisease/SelectFactorDemo";


const ReportEight = ({ setIsPresent }) => {
    const [rango, setRango] = useState({
        riskFactor: 0,
    });
    const [data, setData] = useState([])
    const [title, setTitle] = useState({})
    const [titleTable, setTitleTable] = useState({})
    const [vacio, setVacio] = useState(false);

    const handleChange = (e) => {
        setRango(prev => ({ ...prev, riskFactor: e.value }))
    }
    const handleGenerar = async (e) => {
        e.preventDefault();
        if (rango?.riskFactor === 0) {
            toast.error("Debe seleccionar un factor de riesgo")
        } else {
            const result = await riskForProvince(rango)
            if (result?.success) {

                setTitle({
                    title: ``,
                })
                setTitleTable("Factores de riesgo")
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
        if (rango.riskFactor !== 0) {
            return false;
        }
        return true;
    }
    return (
        <div className="display-block">
            <div className="stadisticts-container">

                <Field>
                    <Control>
                        <SelectFactorDemo label="Factor de riesgo:" onChange={handleChange} />
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
                        <p>No existen datos registrados</p>
                    </div>

                )}
            </div>
        </div>
    )
};

ReportEight.propTypes = {
    setIsPresent: PropTypes.func.isRequired,
};

export default ReportEight;


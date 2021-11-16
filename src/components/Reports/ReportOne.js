import React, { useState } from "react";
import PropTypes from "prop-types";
import { Title, Field, Control, Input, Label, Button } from "rbx";
import "../../styles/index.scss";


const ReportOne = () => {
    const [rango, setRango] = useState({
        inicio: "",
        fin: "",
    });
    const handleChange = (name, value) => {
        setRango(prev => ({ ...prev, [name]: value }))
    }
    const handleGenerar = (e) => {
        e.preventDefault();
    }
    return (
        <div className="display-block">
            <div className="stadisticts-container">

                <p>Rango de fechas:</p>
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
                <Button color="primary" onClick={(e)=>handleGenerar(e)}></Button>
            </div>
        </div>
    )
};

ReportOne.propTypes = {
};

export default ReportOne;


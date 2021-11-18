
import React, { useState } from "react";
import { Card, Icon } from "rbx";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/index.scss";
import ReportFile from "../../components/ReportFile/ReportFile";

const ListReports = ({ setIsPresent, isPresent }) => {
    const listReports = [
        {
            id: 1,
            name: "Posibles enfermedades de una región",
            icon: "file-alt",
        },
        {
            id: 2,
            name: "Todos los síntomas de una enfermedad",
            icon: "file-alt",
        },
        {
            id: 3,
            name: "Todas las enfermedades relacionadas a un síntoma",
            icon: "file-alt",
        },
        {
            id: 4,
            name: "Cantidad de síntomas por región",
            icon: "chart-area",
        },
        {
            id: 5,
            name: "Cantidad de síntomas por provincia",
            icon: "chart-area",
        },
        {
            id: 6,
            name: "Cantidad de síntomas por cantón",
            icon: "chart-area",
        },
        {
            id: 7,
            name: "Regiones que contengan un factor de riesgo en específico",
            icon: "file-alt",
        },
        {
            id: 8,
            name: "Provincias que contengan un factor de riesgo en específico",
            icon: "file-alt",
        },
        {
            id: 9,
            name: "Cantones que contengan un factor de riesgo en específico",
            icon: "file-alt",
        },

    ];


    const [selectReport, setSelectReport] = useState("");

    const handleShowInfo = (e, report) => {
       // e.preventDefault();
        setSelectReport(report.id)
        
        setIsPresent(true);
    }


    return (
        <div>
            {!isPresent && (
                <div className="grid">
                    {listReports?.map(type => (
                        <Card
                            key={type.id}
                            className="card-content display-flex hover-table-options"
                            onClick={(e) => {
                                handleShowInfo(e, type);
                            }}
                        >
                            <div key={type.id} >
                                <Icon size="large">
                                    <FontAwesomeIcon size="3x" icon={type.icon} />
                                </Icon>
                                <h2>{type.name}</h2>

                            </div>
                        </Card>

                    ))}
                </div>
            )}
            {selectReport !== "" && isPresent &&(
                <ReportFile type={selectReport} setIsPresent={setIsPresent} />
            )}
        </div>

    )

};
ListReports.propTypes = {
    setIsPresent: PropTypes.func.isRequired,
    isPresent: PropTypes.bool.isRequired
};

export default ListReports;

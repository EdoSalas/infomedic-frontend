
import React from "react";
import { Card, Icon } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../context";
import Canvas from "../../components/Canvas/Canvas";
import "../../styles/index.scss";
import ReportFile from "../../components/ReportFile/ReportFile";

const ListReports = () => {
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
    {/*  <div className="stadisticts-container">
      <Canvas />
      </div> */}
    const { setModalOpen } = useModal();

    const handleShowInfo = (e, report) => {
        e.preventDefault();
       setModalOpen(true, <ReportFile type={report.id} onClose={() => setModalOpen(false)} />);
    }

    return (
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
                            <FontAwesomeIcon size="4x" icon={type.icon} />
                        </Icon>
                        <h2>{type.name}</h2>

                    </div>
                </Card>

            ))}
        </div>
    )
};

export default ListReports;

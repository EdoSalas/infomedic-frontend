import React from "react";
import PropTypes from "prop-types";
import "../../styles/index.scss";
import ReportOne from "../Reports/ReportOne";


const ReportFile = ({type}) => {
    return (
        <div className="display-block">
            {type === 1 && (
                <ReportOne />
            )}
        </div>
    )
};

ReportFile.propTypes = {
    type: PropTypes.number.isRequired,
};

export default ReportFile;


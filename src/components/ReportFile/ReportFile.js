import React from "react";
import PropTypes from "prop-types";
import "../../styles/index.scss";
import ReportOne from "../Reports/ReportOne";
import ReportFour from "../Reports/ReportFour";
import ReportTwo from "../Reports/ReportTwo";


const ReportFile = ({type, setIsPresent}) => {

    console.log(type)
    return (
        <div className="display-block">
            {type === 1 && (
                <ReportOne setIsPresent={setIsPresent} />
            )}
            {type === 2 && (
                <ReportTwo setIsPresent={setIsPresent} />
            )}
            {type === 4 && (
                <ReportFour setIsPresent={setIsPresent} />
            )}
        </div>
    )
};

ReportFile.propTypes = {
    type: PropTypes.number.isRequired,
    setIsPresent: PropTypes.func.isRequired,
};

export default ReportFile;


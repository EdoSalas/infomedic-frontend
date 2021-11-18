import React from "react";
import PropTypes from "prop-types";
import "../../styles/index.scss";
import ReportOne from "../Reports/ReportOne";
import ReportFour from "../Reports/ReportFour";
import ReportTwo from "../Reports/ReportTwo";
import ReportThree from "../Reports/ReportThree";
import ReportFive from "../Reports/ReportFive";
import ReportSix from "../Reports/ReportSix";
import ReportSeven from "../Reports/ReportSeven";
import ReportEight from "../Reports/ReportEight";
import ReportNine from "../Reports/ReportNine";
import ReportTen from "../Reports/ReportTen";

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
            {type === 3 && (
                <ReportThree setIsPresent={setIsPresent} />
            )}
            {type === 4 && (
                <ReportFour setIsPresent={setIsPresent} />
            )}
            {type === 5 && (
                <ReportFive setIsPresent={setIsPresent} />
            )}
            {type === 6 && (
                <ReportSix setIsPresent={setIsPresent} />
            )}
            {type === 7 && (
                <ReportSeven setIsPresent={setIsPresent} />
            )}
            {type === 8 && (
                <ReportEight setIsPresent={setIsPresent} />
            )}
            {type === 8 && (
                <ReportEight setIsPresent={setIsPresent} />
            )}
            {type === 9 && (
                <ReportNine setIsPresent={setIsPresent} />
            )}
            {type === 10 && (
                <ReportTen setIsPresent={setIsPresent} />
            )}
        </div>
    )
};

ReportFile.propTypes = {
    type: PropTypes.number.isRequired,
    setIsPresent: PropTypes.func.isRequired,
};

export default ReportFile;


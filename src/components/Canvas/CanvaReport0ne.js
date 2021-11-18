/* eslint-disable no-magic-numbers */
/*global window:false */
import React from "react";
import { range, random } from "lodash";
import PropTypes from "prop-types";
import 'animate.css';
import {
    VictoryAxis,
    VictoryBar,
    VictoryTheme,
    VictoryChart,
} from "victory";
const info = [
    { enfermedad: "ebo", cantidad: 20 },
    { enfermedad: "grp", cantidad: 8 },
    { enfermedad: "sdd", cantidad: 2 },
    { enfermedad: "dff", cantidad: 30 }
];
const getStyles = () => {
    const colors = "#3a8d82";
    return {
        fill: colors
    };
};
const barStyle = getStyles();
const CanvaReportOne = ({ data, tick, tickF, labelx, labely, orientationx, orientationy }) => {
console.log(data, tick, labelx, labely, orientationx, orientationy);
    return (
        <div className="animate__animated animate__bounceInLeft">
        <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
              width={400}
              height={400}
        >
            <VictoryAxis dependentAxis
            
                label={labely}
                style={{
                    axisLabel: { padding: 40 }
                }}
                tickFormat={(x) => (`${x }`)}
            />
            <VictoryAxis
                tickValues={tick}
                tickFormat={tickF}
               // label={labelx}
              
                style={{
                    axisLabel: { padding: 30 }
                }}
            />
            {
                tick.map((d, i) => {
                  return (
                    <VictoryAxis dependentAxis
                      key={i}
                      label={d}
                      style={{ tickLabels: { fill: "none" } }}
                      axisValue={d}
                    />
                  );
                })
              }

            <VictoryBar  horizontal
           
                data={data}
                x={orientationx}
                y={orientationy}
                style={{
                    data: barStyle
                }}
            />
        </VictoryChart>
        </div>
        
    )
}

CanvaReportOne.propTypes = {
    data: PropTypes.array.isRequired,
    tick: PropTypes.array.isRequired,
    tickF: PropTypes.array.isRequired,
    labelx: PropTypes.string.isRequired,
    labely: PropTypes.string.isRequired,
    orientationx: PropTypes.string.isRequired,
    orientationy: PropTypes.string.isRequired,
};
export default CanvaReportOne;
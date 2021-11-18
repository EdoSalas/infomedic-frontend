/* eslint-disable no-magic-numbers */
import React from "react";
import PropTypes from "prop-types";
import 'animate.css';
import {
    VictoryAxis,
    VictoryBar,
    VictoryTheme,
    VictoryChart,
} from "victory";

const getStyles = () => {
    const colors = "#3a8d82";
    return {
        fill: colors
    };
};
const barStyle = getStyles();
const CanvaReportOne = ({ data, tick, tickF, labelx, labely, orientationx, orientationy, horizontal, axis }) => {

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
                    tickFormat={(x) => (`${x}`)}
                />
                <VictoryAxis
                    tickValues={tick}
                    tickFormat={tickF}
                    // label={labelx}

                    style={{
                        axisLabel: { padding: 30 }
                    }}
                />

                {axis && (tick.map((d, i) => {
                    return (
                        <VictoryAxis dependentAxis
                            key={i}
                            label={d}
                            style={{ tickLabels: { fill: "none" } }}
                            axisValue={d}
                        />
                    );
                }))

                }

                <VictoryBar horizontal={horizontal}

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
CanvaReportOne.defaultProps = {
    horizontal: true,
    axis: true,
}
CanvaReportOne.propTypes = {
    data: PropTypes.array.isRequired,
    tick: PropTypes.array.isRequired,
    tickF: PropTypes.array.isRequired,
    labelx: PropTypes.string.isRequired,
    labely: PropTypes.string.isRequired,
    orientationx: PropTypes.string.isRequired,
    orientationy: PropTypes.string.isRequired,
    horizontal: PropTypes.bool,
    axis: PropTypes.bool,
};
export default CanvaReportOne;
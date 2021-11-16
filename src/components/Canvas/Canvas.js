/* eslint-disable no-magic-numbers */
/*global window:false */
import React from "react";
import { range, random } from "lodash";
import {
  CanvasGroup,
  CanvasCurve,
  VictoryAxis,
  VictoryBar,
  VictoryTheme,
  CanvasBar,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  CanvasPoint
} from "victory";
const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  const getStyles = () => {
    const colors = ["#3a8d82"];
    return {
      fill: colors[random(0, 5)]
    };
  };
  const barStyle = getStyles();
const Canvas = () => {
    
      return (
        <VictoryChart
          // adding the material theme provided with Victory
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          label="experiment"
          style={{
            axisLabel: { padding: 30 }
          }}
        />
        <VictoryAxis dependentAxis
          label="percent yield"
          style={{
            axisLabel: { padding: 40 }
          }}
            tickFormat={(x) => (`$${x / 1000}k`)}
        />
          <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
            style={{
                data: barStyle
              }}
          />
        </VictoryChart>
      )
  }
  
export default Canvas;
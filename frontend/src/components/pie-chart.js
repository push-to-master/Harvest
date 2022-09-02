/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
    render() {
        const options = {
            theme: "light1",
            animationEnabled: true,
            exportFileName: "Types of Produce Harvested",
            exportEnabled: true,
            title: {
                text: "Top Categories of New Year's Resolution"
            },
            width: 800,
            height: 700,
            data: [{
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
                indexLabelPlacement: "inside",
                dataPoints: [
                    { y: 32, label: "Spud" },
                    { y: 22, label: "Fruit" },
                    { y: 15, label: "Peppers" },
                    { y: 19, label: "Leaf" },
                    { y: 5, label: "Squash" },
                    { y: 7, label: "Beans" }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default PieChart;                         
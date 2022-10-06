/* App.js */
import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = (props) => {
    //PROCESSING LOGS TO GET UNIQUE TYPES AND RESPECTIVE AGGREGATION
    const prepareGraph = () => {
        const rawData = props.logsData;
        //Strip all element properties except date and yield
        let newArray = rawData.map(({ _id, description, num_plants, org_id, date, type, user_id, user_name, ...item }) => item);
        //get the sum of all yields
        const totalYield = newArray.map(item => item.yield).reduce((prev, next) => prev + next);
        //process yield and produce to get datapoint array
        newArray = newArray.map(elem => (
            {
                y: Math.trunc((elem.yield / totalYield) * 100),
                label: elem.produce,
                count: elem.yield
            }
        ));
        //get unique datapoints
        const processData = (data) => {
            return (Object.values(data.reduce((obj, item) => {
                var key = item.label
                if (!obj[key]) {
                    obj[key] = Object.assign(item)
                } else {
                    obj[key].y += item.y
                    obj[key].count += item.count
                }
                return obj
            }, {})))
        };
        newArray = processData(newArray);
        return newArray;
    }

    const [graphData, setGraphData] = React.useState(()=>{
        return prepareGraph();}
    )

    //pie chart options
    const options = {
        theme: "light1",
        animationEnabled: true,
        exportFileName: "Types of Produce Harvested",
        exportEnabled: true,
        title: {
            text: "Distribution of Produce from all Harvests"
        },
        width: 800,
        height: 700,
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{count}</strong> ",
            indexLabel: "{label}:{y}%",
            indexLabelPlacement: "inside",
            dataPoints: graphData
            // [
            //     { y: 32, label: "Spud" },
            //     { y: 22, label: "Fruit" },
            //     { y: 15, label: "Peppers" },
            //     { y: 19, label: "Leaf" },
            //     { y: 5, label: "Squash" },
            //     { y: 7, label: "Beans" }
            // ]
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

export default PieChart;                         
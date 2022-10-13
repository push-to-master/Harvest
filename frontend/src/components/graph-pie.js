/* App.js */
import React, { useEffect } from 'react';
import CanvasJSReact from './canvasjs.react';
import { filterByType, filterByCategory } from './filters/filters.js'

import GraphPieFilters from './graphs-pie-filters';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = (props) => {
    //PROCESSING LOGS TO GET UNIQUE TYPES AND RESPECTIVE AGGREGATION
    const [categoryFilter,setCategoryFilter] = React.useState(null);
    const [typeFilter,setTypeFilter] = React.useState(null);
    const [rawData,setRawData] = React.useState(props.logsData);
    async function applyPieFilters (filters){
        setCategoryFilter(filters.category);
        setTypeFilter(filters.type);
    }
    const prepareGraph = () => {
        //Strip all element properties except date and yield
        // let newArray = rawData.map(({ _id, description, num_plants, org_id, date, type, user_id, user_name, ...item }) => item);
        const filterOn = ["category","type","produce"];
        let filterSelect = 0;
        let newArray = rawData
        //get the sum of all yields
        if (categoryFilter!==null&&typeFilter===null){
            newArray = filterByCategory(newArray,categoryFilter);
            filterSelect = 1;
        }
        else if(typeFilter!==null){
            newArray = filterByCategory(newArray,categoryFilter);
            newArray = filterByType(newArray,typeFilter);
            filterSelect = 2;
        }
        const totalYield = newArray.map(item => item.yield).reduce((prev, next) => prev + next);
        //process yield and produce to get datapoint array
        
        
        newArray = newArray.map(elem => (
            {
                y: Math.trunc((elem.yield / totalYield) * 100),
                label: elem[filterOn[filterSelect]],
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
            dataPoints: prepareGraph()
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
            <GraphPieFilters logsData = {props.logsData} applyFilters ={applyPieFilters} />
            <CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    );
}

export default PieChart;                         
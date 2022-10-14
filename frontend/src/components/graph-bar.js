import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BarGraph(props) {
	const [graphData,setGraphData] = React.useState([])
	
	//PROCESSING LOGS DATA TO UNIQUE DATES YIELDS
	React.useEffect(() => {
        const prepareGraph = () => {
			const rawData = props.logsData;
			//Strip all element properties except date and yield
			let newArray = rawData.map(({_id,description, num_plants,org_id,produce,type,user_id,user_name, ...item}) => item);
			//Create data point array with dates as the labels and yields as the y values
			newArray = newArray.map(elem => (
				{
					label: elem.date.slice(0,10),
					y : elem.yield
				} 
			  ));

			//Sum up the yields for logs which share the dame date
			const processData = (data) => {
				return (Object.values(data.reduce((obj, item) => {
					var key = item.label
					if (!obj[key]) {
					  obj[key] = Object.assign(item)
					} else {
					  obj[key].y += item.y
					}
					return obj
				  }, {})))
			};
			newArray = processData(newArray);
			setGraphData(newArray)
		}
		prepareGraph();
      }, [props.logsData])

	//bar graph options
	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light1", //"light1", "dark1", "dark2"
		title: {
			text: "Harvest Per Day"
		},
		axisY: {
			title:"Yield (g)",
			includeZero: true
		},
		axisX:{
			title:"Date of Harvest"
		},
		width: 800,
		height: 700,
		data: [{
			type: "column", //change type to bar, line, area, pie, etc
			//indexLabel: "{y}", //Shows y value on all Data Points
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "outside",
			dataPoints: graphData
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

export default BarGraph;                     
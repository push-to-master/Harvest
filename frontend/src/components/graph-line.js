import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineGraph = (props) => {
	const [graphData, setGraphData] = React.useState([])

	React.useEffect(() => {
		const prepareGraph = () => {
			const rawData = props.logsData;
			let newArray = rawData.filter((elem)=>(elem.type === props.type));
			newArray = newArray.map(({ _id, description, num_plants, org_id, produce, type, user_id, user_name, ...item }) => item);
			const maxYield = Math.max(...newArray.map(o => o.yield))
			newArray = newArray.map(elem => (
				{
					x: parseInt(elem.date.slice(8, 10)), 
					y: (elem.yield/maxYield)*100,
					date:elem.date.slice(0,10)
				}
			));
			const processData = (data) => {
				return (Object.values(data.reduce((obj, item) => {
					var key = item.x
					if (!obj[key]) {
						obj[key] = Object.assign(item)
					} else {
						obj[key].y += item.y
					}
					return obj
				}, {})))
			};
			newArray = processData(newArray);
			console.log(newArray);
			setGraphData(newArray)
		}
		prepareGraph();
	}, [props.logsData, props.type])

	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2", // "light1", "dark1", "dark2"
		title: {
			text: "Total Harvest by Last 30 Days"
		},
		width: 1000,
		height: 600,
		axisY: {
			title: props.type+" Harvest Trend",
			suffix: "%"
		},
		axisX: {
			title: "Day"
		},
		data: [{
			type: "line",
			toolTipContent: "Day {x}: {y}%",
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

export default LineGraph;                     
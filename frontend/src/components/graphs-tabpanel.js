import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';


import BarGraph from './graph-bar';
import PieChart from './graph-pie';
import GraphPieFilters from './graphs-pie-filters';

//Render a container that changes contents based on props
function TabPanel(props) {

    const { children, value, index, logsData, ...other } = props;
    const [categoryFilter,setCategoryFilter] = React.useState(null);
    const [typeFilter,setTypeFilter] = React.useState(null);

    React.useEffect(()=>{
        console.log(categoryFilter)
        console.log(typeFilter)
    })

    //check selection to decide which graph to render
    if (index === 0) {
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                data-testid="Graph"
                {...other}
            >
                {/*Render Bar Graph*/}
                <Box sx={{ pl: 10 }}>
                    <BarGraph logsData={logsData} />
                </Box>

            </div>
        );

    //if line graph selected
    } 
      //If Pie chart has been selected, render the pie chart
    else {
        
        
        async function applyPieFilters (filters){
            setCategoryFilter(filters.category);
            setTypeFilter(filters.type);
        }
        return (
            
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                data-testid="Graph"
                {...other}
            >
                <GraphPieFilters logsData = {logsData} applyFilters ={applyPieFilters} />
                <br/>
                <Box sx={{ pl: 10 }}>
                    {/*Render Pie Graph*/}
                    <PieChart logsData = {logsData} categoryFilter={categoryFilter} typeFilter={typeFilter}/>
                </Box>

            </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default TabPanel;
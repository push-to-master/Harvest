import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';


import BarGraph from './graph-bar';
import PieChart from './graph-pie';
import LineGraph from './graph-line';

//Render a container that changes contents based on props
function TabPanel(props) {

    const { children, value, index, logsData, ...other } = props;
    const [lineGraphType, setType] = React.useState("Bean");
    

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
    } else if (index === 1) {
        
        //Handle change when user changes filter option, update the displayed filter box
        const handleChange = (event) => {
            setType(event.target.value);
        };
        const types = [...new Set(logsData.map(item => item.type))];
        
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                data-testid="Graph"
                {...other}
            >

                <Box sx={{ pl: 10 }}>
                    {/*Filter Selector*/}
                    <TextField
                        id="outlined-select-crop"
                        select
                        label="Select"
                        value={lineGraphType}
                        onChange={handleChange}
                        helperText="Please select crop"
                    >
                        {types.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/*Render Line Graph*/}
                    <LineGraph logsData = {logsData} type = {lineGraphType}/>
                </Box>

            </div>
        );
        //If Pie chart has been selected, render the pie chart
    } else {
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                data-testid="Graph"
                {...other}
            >
                <Box sx={{ pl: 10 }}>
                    {/*Render Pie Graph*/}
                    <PieChart logsData = {logsData} type = {lineGraphType}/>
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
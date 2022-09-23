import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';


import BarGraph from './graph-bar';
import PieChart from './graph-pie';
import LineGraph from './graph-line';


function TabPanel(props) {

    const { children, value, index, logsData, ...other } = props;
    const [lineGraphType, setType] = React.useState("Bean");
    // console.log(logsData);
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
                <Box sx={{ pl: 10 }}>
                    <BarGraph logsData={logsData} />
                </Box>

            </div>
        );
    } else if (index === 1) {
        
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
                    <LineGraph logsData = {logsData} type = {lineGraphType}/>
                </Box>

            </div>
        );
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
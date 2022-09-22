import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import BarGraph from './graph-bar';
import PieChart from './graph-pie';
import LineGraph from './graph-line';

import HarvestDataService from "../services/harvest.js";


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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function ShowGraphs() {
    const [value, setValue] = React.useState(0);
    const [logs, setLogs] = React.useState([]);
    const [isFetching, setFetching] = React.useState(true);

    React.useEffect(() => {
        retrieveLogs();
    }, [])
    const retrieveLogs = () => {
        let pageNum = 0;
        HarvestDataService.getAllLogs(pageNum)
            .then(response => {
                // console.log(response.data.logs);
                setLogs(response.data.logs);
                // logs.current = response.data.logs;
                setFetching(false);
            })
            .catch(e => {
                console.log(e);
                setFetching(false)
            });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            {isFetching ? (
                <div>Loading</div>
            ) : (
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 800, width: 700 }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0} logsData={logs}>
                        Yield per Day
                    </TabPanel>
                    <TabPanel value={value} index={1} logsData={logs}>
                        Yield per Crop
                    </TabPanel>
                    <TabPanel value={value} index={2} logsData={logs}>
                        Item Three
                    </TabPanel>
                </Box>
            )}
        </div>
    );
}
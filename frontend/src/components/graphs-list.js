import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './graphs-tabpanel';

import HarvestDataService from "../services/harvest.js";

/* istanbul ignore next */
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

    //Before Render: retrieve the logs from the server
    /* istanbul ignore next */
    React.useEffect(() => {
        retrieveLogs();
    }, [])

    //API call to retrieve logs from backend and store them in the component state
    /* istanbul ignore next */
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

   //Handle change when user selects a new tab, change its stored index
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //Render tabs and tabPanels
    return (
        <div data-testid="GraphsList">
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
                        <Tab label="Harvest per Day (Bar)" {...a11yProps(0)} />
                        <Tab label="Harvest Distribution (Pie)" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0} logsData={logs}>
                        {console.log({value})}
                        Yield per Day
                    </TabPanel>
                    <TabPanel value={value} index={1} logsData={logs}>
                        Yield Distribution
                    </TabPanel>
                </Box>
            )}
        </div>
    );
}
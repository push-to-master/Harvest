import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import { filterByDate, filterByFood, filterByType, filterByCategory } from './filters/filters.js'

const GraphPieFilters = (props) => {
    const [selectedCategory, setCategory] = React.useState(null)
    const [selectedType, setType] = React.useState(null)
    const [logs, setLogs] = React.useState(props.logsData);
    const [showCategories, setShowCategories] = React.useState(false);
    const [showTypes, setShowTypes] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [types, setTypes] = React.useState([]);

    const handleAggregate = (value) => {
        console.log(value);
        if (value == 0) { //if all is selected
            setCategory(null);
            setType(null);
            setShowCategories(false);
            setShowTypes(false);
        }
        else if (value == 1) { //if per category is selected
            const uniqueCategories = [...new Set(logs.map(item => item.category))];
            setCategory(uniqueCategories[0])
            setType(null);
            setCategories(uniqueCategories);
            setShowCategories(true);
            setShowTypes(false);

        }
        else if (value == 2) { //if per type is selected
            ;
            const uniqueCategories = [...new Set(logs.map(item => item.category))];
            setCategory(uniqueCategories[0])

            const typesArray = filterByCategory(logs, uniqueCategories[0])
            const uniqueTypes = [...new Set(typesArray.map(item => item.type))];
            
            
            setType(uniqueTypes[0]);

            setTypes(uniqueTypes);
            setShowCategories(true);
            setShowTypes(true);
        }
    }
    const handleCategory = (value) => {
        setCategory(value);
        const typesArray = filterByCategory(logs, value);
        const uniqueTypes = [...new Set(typesArray.map(item => item.type))];
        setTypes(uniqueTypes);
        setShowCategories(true);
    }

    const handleApplyFilter=()=>{   
        const filters = {
            category : selectedCategory,
            type : selectedType
        }
        props.applyFilters(filters);
    }

    return (
        <div>
            <Box sx={{ minWidth: 120, pl: 10 }}>
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Aggregate:
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: 'aggregate',
                            id: 'uncontrolled-native',
                        }}
                        onChange={e => handleAggregate(e.target.value)}
                    >
                        <option value={0}>All</option>
                        <option value={1}>Per Category</option>
                        <option value={2}>Per Type</option>
                    </NativeSelect>
                </FormControl>
                {showCategories && <FormControl> {/*Hide extra fields if all is selected*/}
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Category:
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: 'aggregateCats',
                            id: 'uncontrolled-native',
                        }}
                        onChange={e => handleCategory(e.target.value)}
                    >
                        {categories.map((elem) => {
                            return (<option key={elem} value={elem}>{elem}</option>);
                        })}
                    </NativeSelect>
                </FormControl>}
                {showCategories && showTypes && <FormControl> {/*Hide extra fields if all is selected*/}
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Type:
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: 'aggregateTypes',
                            id: 'uncontrolled-native',
                        }}
                        onChange={e => setType(e.target.value)}
                    >
                        {types.map((elem) => {
                            return (<option key={elem} value={elem}>{elem}</option>);
                        })}
                    </NativeSelect>
                </FormControl>}
                <Button sx={{ m:2 }} variant="contained" onClick={() => { handleApplyFilter() }}>
                    Apply
                </Button>
            </Box>
            <Box sx={{ minWidth: 120 }}>

            </Box>
        </div>
    );
}
export default GraphPieFilters
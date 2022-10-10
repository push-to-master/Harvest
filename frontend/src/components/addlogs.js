import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material/";
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import LogsTable from './logs-table';
import HarvestDataService from '../services/harvest';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Autocomplete from '@mui/material/Autocomplete';

//Function to convert an objects date object into a string literal for neat display (args: dateObject returns: string)
const dateString = (dateObject) => {
  const date = dateObject;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return year + "-" + (((month + "").length === 1) ? "0" + month : month) + "-" + (((day + "").length === 1) ? "0" + day : day)
}

//React component to take user input through various forms and dropdowns, and send an API request to server to add a new log
const LogsAddLog = props => {
  const [currentUser] = useState(props.user)
  const [currentOrg, setCurrentOrg] = useState(props.org)
  const [harvestDescription, setDescription] = useState("")
  const [cropYield, setYield] = useState(0)
  const [selectedDate, setDate] = useState(dateString(new Date()))
  const [logsUploaded,setLogsUploaded] = useState(0);

  const [selectedCategory, setCategory] = useState("None")
  const [selectedType, setType] = useState("None")
  const [selectedProduce, setProduce] = useState("None")

  //Function returns true if the user has not selected a value for all fields or has not logged in
  const invalidForm = () =>{
    return (
      (selectedType ==="None" ||
      selectedProduce==="None"||
      harvestDescription ==="" ||
      !currentUser||
      cropYield <=0)
    )
  }
  //API request to add a log to the database
  const uploadLog =() =>{
    var data = {
      user_name: currentUser.name,
      produce: selectedProduce,
      type: selectedType,
      category: selectedCategory,
      yield: cropYield,
      description : harvestDescription
    };
    HarvestDataService.createLog(data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e); 
        });
    setLogsUploaded(logsUploaded+1)
  }  

  const [category, setCategoryArray] = useState([]);
  const [type, setTypeArray] = useState([]);
  const [produce, setProduceArray] = useState([]);

  //api call to populate Types state
  const [typedata, setTypedata] = useState([]);
  React.useEffect(() => {
      retrieveType();
  }, [])
  const retrieveType = () => {
      HarvestDataService.getTypes()
          .then(response => {            
              setTypedata(response.data.category);
              setInitialArrays();
          })
          .catch(e => {
              console.log(e);
          });
  }; 
  // sets all initial input option arrays
  const setInitialArrays = () =>{
    // getting list of unique Supertypes aka categories.
    setCategoryArray([...new Set(typedata.map(elem => elem.Supertype))]);
    setTypeArray( [...new Set(typedata.map(elem => elem.Type))]);
    setProduce([...new Set(typedata.map(elem => elem.Type))]);
  }

  // sets the category and gets an array of types that fall under that category
  const handleSetCategory = (event ) =>{
    setCategory(event.target.value);
    //changes the type and produce array to what is restricted by the category
    const temp = typedata.filter(elem => elem.Supertype === event.target.value);
    setTypeArray([...new Set(temp.map(elem => elem.Type))]);
    
    console.log(temp);
  };
  return (
    
    <div>
      {/*START ADD LOG FORM*/}
      <Accordion sx={{ width: '90%', overflow: 'hidden',  left:'5%', bottom: '1%', background: '#e8f5e9'}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >   
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            New Log 
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Add new harvest entry</Typography>
        </AccordionSummary>
    <AccordionDetails sx={{ width: '90%', overflow: 'hidden', margin: 'auto'}}>
    <Grid container spacing={2}
      
      sx={{ width: '90%', overflow: 'hidden', margin: 'auto', p: 2 }}
    >
      <Grid item xs={3}>
        <TextField
          id="add_log_date"
          label="Date of Harvest"
          type="date"
          defaultValue={selectedDate}
          sx={{ width: '100%' }}
          onChange={e => setDate(dateString(new Date(e.target.value)))}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={3}> 
      <FormControl fullWidth>
        <TextField
          labelId= "add_log_category_label"
          id="add_log_category"
          label="Select Category"
          value={selectedCategory}
          onChange={handleSetCategory}
          select
        >
          
          {category.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={3}>  
        <TextField
          id="add_log_type"
          select
          label="Select Type"
          value={selectedType}
          onChange={e => setType(e.target.value)}
          sx={{ width: '100%' }}
        >
          {type.map((option) => (
            <MenuItem key={option} value={option}>
              {option }
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Yield (g)"
          id="add_log_yield"
          type="number"
          sx={{ width: '100%' }}
          value={cropYield}
          onChange={e => setYield(parseFloat(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Harvest Description"
          id="add_log_description"
          type="text"
          sx={{ width: '100%' }}
          value={harvestDescription}
          onChange={e => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" disabled={invalidForm()} onClick={()=>{uploadLog()}}>
          Submit Harvest
        </Button>

      </Grid>
    </Grid>
    {/*END ADD LOG FORM*/}
    </AccordionDetails>
    </Accordion>
    
    {/*TABLE DATA COMPONENT*/}
    <LogsTable key={logsUploaded}/>
    {/*END TABLE DATA COMPONENT*/}
  </div>
);
}


export default LogsAddLog

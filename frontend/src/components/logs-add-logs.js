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

  const [selectedCategory, setCategory] = useState("")
  const [selectedType, setType] = useState("")
  const [selectedProduce, setProduce] = useState("")

  //Function returns true if the user has not selected a value for all fields or has not logged in
  const invalidForm = () =>{
    return (
      (selectedType ==="" ||
      selectedProduce===""||
      selectedCategory === ""||
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
              setInitialArrays(response.data.category);
          })
          .catch(e => {
              console.log(e);
          });
  }; 
  // sets all initial input option arrays
  const setInitialArrays = (data) =>{
    // getting list of unique Supertypes aka categories.
    setCategoryArray([...new Set(data.map(elem => elem.Supertype))]);
    setTypeArray( [...new Set(data.map(elem => elem.Type))]);
    setProduceArray([...new Set(data.map(elem => elem.Food))]);
  }

  // sets the category and gets an array of types that fall under that category
  const handleSetCategory = (value,reason ) =>{
    if(reason === "clear"){
      setInitialArrays(typedata);
      setCategory("");
      setType("");
      setProduce("");
    }else{
    setCategory(value);
      //changes the type and produce array to what is restricted by the category
      var temp = typedata.filter(elem => elem.Supertype ===value);
      var temp2 = [...new Set(temp.map(elem => elem.Type))];
      setTypeArray(temp2);
      temp2 = [...new Set(temp.map(elem => elem.Food))];
      setProduceArray(temp2);
    }
  };

  const handleSetType = (value, reason ) =>{
    if(reason === "clear"){
      setProduceArray([...new Set(typedata.map(elem => elem.Food))]);
      setProduce("");
      setType("");
    }else {
      console.log(reason);
      setType(value);
      let obj = typedata.find(o => o.Type === value);
      if (selectedCategory === "" ){
        setCategory(obj.Supertype);
        setCategoryArray([obj.Supertype]);
      }
     var temp = typedata.filter(elem => elem.Type === value);
      var temp2 = [...new Set(temp.map(elem => elem.Food))];
      setProduceArray(temp2);
    }
  };

  const handleSetProduce = (value,reason ) =>{
    setProduce(value);
    let obj = typedata.find(o => o.Food === value);
    if(selectedType === ""){
      setType(obj.Type);
      var temp = typedata.filter(elem => elem.Food === value);
      var temp2 = [...new Set(temp.map(elem => elem.Type))];
      setTypeArray(temp2);
    }
    if (selectedCategory === ""){
      setCategory(obj.Supertype);
      setCategoryArray([obj.Supertype]);
    }
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
    <AccordionDetails sx={{ width: '90%', mx: '5%', mr: '5%'}}>
    <Grid container rowSpacing={6}
          columnSpacing={{  sm: 10, md: 10 }}
          sx={{ width: '70%', overflow: 'hidden', }}
          justifyContent="center"
    >
      <Grid item xs={3.5}> 
      <Autocomplete
        label="Select Category"
        id="category-select"
        options ={category}
        value={selectedCategory}
        disablePortal
        onChange={(event, value,reason) => handleSetCategory(value,reason)}
        renderInput={(params) => (
          <TextField 
              {...params}
              label="Select Category" />
        )}
      />
      </Grid>
      <Grid item xs={3.5}> 
      <Autocomplete
        label="Select Type"
        id="type-select"
        options ={type}
        value={selectedType}
        disablePortal
        onChange={(event, value,reason) => handleSetType(value,reason)}
        renderInput={(params) => (
          <TextField 
              {...params}
              label="Select Type" />
        )}
      />
      </Grid>
      <Grid item xs={3.5}> 
      <Autocomplete
        label="Select Produce"
        id="produce-select"
        options ={produce}
        value={selectedProduce}
        disablePortal
        onChange={(event, value,reason) => handleSetProduce(value,reason)}
        renderInput={(params) => (
          <TextField 
              {...params}
              label="Select Produce" />
        )}
      />
      </Grid>
      <Grid item xs={3.5}> 
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
      <Grid item xs={3.5}> 
        <TextField
          label="Yield (grams)"
          id="add_log_yield"
          type="number"
          sx={{ width: '100%' }}
          value={cropYield}
          onChange={e => setYield(parseFloat(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="start">g</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={3.5}> 
        <TextField
          label="Harvest Description"
          id="add_log_description"
          type="text"
          sx={{ width: '100%' }}
          value={harvestDescription}
          onChange={e => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item sm={1} xl= {10.5}>
        <Button sx ={{width: '100%'}}  variant="contained" disabled={invalidForm()} onClick={()=>{uploadLog()}}>
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

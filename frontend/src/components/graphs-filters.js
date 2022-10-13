import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material/";
import HarvestDataService from '../services/harvest';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Autocomplete from '@mui/material/Autocomplete';

import {filterByDate, filterByFood, filterByType, filterByCategory} from './filters/filters.js'

//Function to convert an objects date object into a string literal for neat display (args: dateObject returns: string)
const dateString = (dateObject) => {
  const date = dateObject;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return year + "-" + (((month + "").length === 1) ? "0" + month : month) + "-" + (((day + "").length === 1) ? "0" + day : day)
}

//React component to take user input through various forms and dropdowns, and send an API request to server to add a new log
const GraphsFilters = (props) => {
  const [startDate, setStartDate] = useState("NaN-NaN-NaN")
  const [endDate, setEndDate] = useState(dateString(new Date()))
  const [selectedCategory, setCategory] = useState("")
  const [selectedType, setType] = useState("")
  const [selectedProduce, setProduce] = useState("")
  const [logData,setLogs] = useState(props.logs);

  //Function returns true if the user has not selected a value for at least one field
  const invalidForm = () =>{
    return !(
      selectedCategory!=""||selectedType!=""||selectedProduce!=""||!(endDate=="NaN-NaN-NaN" &&startDate=="NaN-NaN-NaN")
    )
  }
  //Handler to apply filters to log data
  const handleFilter =() =>{
    let tempLogs = logData;
    //Process date filters
    if (startDate == "NaN-NaN-NaN"&&endDate!="NaN-NaN-NaN") { //if the user entered only end date
        console.log("Filtering by End Date only")
        tempLogs = filterByDate(tempLogs,null,endDate)
    }
    else if (endDate =="NaN-NaN-NaN" &&startDate!="NaN-NaN-NaN") { //if the user entered only start date
        console.log("Filtering by Start Date only")
        tempLogs = filterByDate(tempLogs,startDate,null)
    }
    else if (endDate!="NaN-NaN-NaN"&&startDate!="NaN-NaN-NaN" &&startDate<endDate){ //if the user entered both dates and valid ordering of dates
        console.log("Filtering between dates")
        tempLogs = filterByDate(tempLogs,startDate,endDate)
    }

    //Process type filters, start with smallest subtype then work towards supertype
    if (selectedProduce!="") {
        console.log("Filtering by Produce")
        tempLogs = filterByFood(tempLogs,selectedProduce)
    }
    else if(selectedType!=""){
        console.log("Filtering by Type")
        tempLogs = filterByType(tempLogs,selectedType)
    }
    else if(selectedCategory!=""){
        console.log("Filtering by Category")
        tempLogs = filterByCategory(tempLogs,selectedCategory)
    }
    //Use function provided by graphs-list to apply the filtered logs state
    props.applyFilter(tempLogs);
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
    <Accordion sx={{width:'90%', left:'5%', bottom: '1%', background: '#efefef'}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        > 
          <Typography sx={{ color: 'text.secondary' }}>Filter Data</Typography>
        </AccordionSummary>
    <AccordionDetails sx={{ width: '90%', mx: '5%', mr: '5%'}}>
    <Grid container rowSpacing={2}
          columnSpacing={{  sm: 10, md: 5 }}
          sx={{ width: '70%'}}
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
          id="filter_start_date"
          label="Start Date"
          type="date"
          sx={{ width: '100%' }}
          onChange={e => setStartDate(dateString(new Date(e.target.value)))}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={3.5}> 
        <TextField
          id="filter_end_date"
          label="End Date"
          type="date"
          defaultValue={endDate}
          sx={{ width: '100%' }}
          onChange={e => setEndDate(dateString(new Date(e.target.value)))}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      
      <Grid item sm={1} xl= {10.5}>
        <Button sx ={{width: '100%'}}  variant="contained" disabled={invalidForm()} onClick={()=>{handleFilter()}}>
          Apply
        </Button>

      </Grid>
    </Grid>
    {/*END ADD LOG FORM*/}
    </AccordionDetails>
    </Accordion>
  </div>
);
}


export default GraphsFilters

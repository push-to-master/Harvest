import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material/";
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import LogsTable from './logs-table';
import HarvestDataService from '../services/harvest'
const crops = [
  {
    name: 'None'
  },
  {
    name: 'Carrot',
  },
  {
    name: 'Bean'
  },
  {
    name: 'Fruit'
  }
]

const produce = [
  {
    name: 'None'
  },
  {
    name: 'Carrot',
  },
  {
    name: 'Bean'
  },
  {
    name: 'Fruit'
  }
]

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
  const [selectedCropType, setCropType] = useState("None")
  const [selectedCropProduce, setCropProduce] = useState("None")
  const [harvestDescription, setDescription] = useState("")
  const [cropYield, setYield] = useState(0)
  const [numberPlants,setNumberPlants] = useState(0)
  const [selectedDate, setDate] = useState(dateString(new Date()))
  const [logsUploaded,setLogsUploaded] = useState(0);

  //Function returns true if the user has not selected a value for all fields or has not logged in
  const invalidForm = () =>{
    return (
      (selectedCropType ==="None" ||
      selectedCropProduce==="None"||
      harvestDescription ==="" ||
      !currentUser||
      numberPlants <=0||
      cropYield <=0)
    )
  }

  //API request to add a log to the database
  const uploadLog =() =>{
    var data = {
      user_name: currentUser.name,
      produce: selectedCropProduce,
      type: selectedCropType,
      yield: cropYield,
      num_plants : numberPlants,
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

  return (
    <div>
      {/*START ADD LOG FORM*/}
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
          <TextField
            id="add_log_crop"
            select
            label="Select Crop"
            value={selectedCropType}
            onChange={e => setCropType(e.target.value)}
            sx={{ width: '100%' }}
          >
            {crops.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="add_log_produce"
            select
            label="Select Produce/Subtype"
            value={selectedCropProduce}
            onChange={e => setCropProduce(e.target.value)}
            sx={{ width: '100%' }}
          >
            {produce.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Yield (kg)"
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
            label="Number of plants"
            id="add_log_num_plants"
            type="number"
            sx={{ width: '100%' }}
            value={numberPlants}
            onChange={e => setNumberPlants(parseFloat(e.target.value))}
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

      {/*TABLE DATA COMPONENT*/}
      <LogsTable key={logsUploaded}/>
      {/*END TABLE DATA COMPONENT*/}
    </div>
  );
}


export default LogsAddLog

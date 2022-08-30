import React, { useState} from "react";
import { Grid, TextField, Button } from "@mui/material/";
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import LogsTable from './logs-table';
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

const dateString = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return year + "-" + (((month + "").length === 1) ? "0" + month : month) + "-" + day
}

const LogsAddLog = props => {
  const [currentOrg, setCurrentOrg] = useState(props.org)
  const [selectedCrop, setCrop] = useState(["None"])

  const handleChange = (event) => {
    setCrop(event.target.value);
  };

  return (
    <div>
      {/*START ADD LOG FORM*/}
      <Grid container spacing={2}
        sx={{ width: '90%', overflow: 'hidden', margin: 'auto' , p:2}}
      >
        <Grid item xs={3}>
          <TextField
            id="outlined-start-adornment"
            label="Date of Harvest"
            type="date"
            defaultValue={dateString()}
            sx={{ width: '100%' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="crop"
            select
            label="Select Crop"
            value={selectedCrop}
            onChange={handleChange}
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
            label="Net Harvest"
            id="net_harvest"
            type="number"
            sx={{ width: '100%' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Button variant="contained" disabled={(selectedCrop==='None')}>
            Submit Harvest
          </Button>
          
        </Grid>
      </Grid>
      {/*END ADD LOG FORM*/}

      {/*TABLE DATA COMPONENT*/}
      <LogsTable />
      {/*END TABLE DATA COMPONENT*/}
    </div>
  );
}


export default LogsAddLog

import React, { useState }/*, { useState, useEffect }*/ from "react";
import OrgsCard from "./orgs-card";
import Grid from '@mui/material/Grid';
import HarvestDataService from "../services/harvest.js";


//Orgs list is container to render orgs-card components and store them in a centred div, populate them with data from api call
const OrgsList = props => {
    const [orgs, setOrgs] = useState([]);


    //api call to populate orgs state with orgs data
    React.useEffect(() => {
        retrieveLogs();
    }, [])
    const retrieveLogs = () => {
        HarvestDataService.getOrgs()
            .then(response => {
                console.log(response.data.orgs);
                setOrgs(response.data.orgs);
            })
            .catch(e => {
                console.log(e);
            });
    };

    //Div to centre grid object and populate grid object with grid items
    return (
        <div data-testid="OrgsList">
            <Grid container spacing={2}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {orgs.map((org) => {
                    return (
                        <Grid key={org.id} item>
                            <OrgsCard name={org.name} desc={org.description} personal={org.is_personal}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default OrgsList
import React/*, { useState, useEffect }*/ from "react";
import { Link } from "react-router-dom";
import OrgsCard from "./orgs-card";
import Grid from '@mui/material/Grid';

import { faker } from '@faker-js/faker';
let ORGS = []
for (let index = 0; index < 20; index++) {
    ORGS[index] = {
        id:index,
        name: faker.company.name(),
        desc: faker.lorem.sentence(15),
        personal: Math.random()>0.5
    }

}


const OrgsList = props => {
    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Grid container spacing ={2}>
                {ORGS.map((org) =>{
                    return(
                    <Grid item key={org.id}>
                        <OrgsCard name={org.name} desc = {org.desc} personal ={org.personal}/>
                    </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default OrgsList
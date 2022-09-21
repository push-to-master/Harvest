import React, { useState }/*, { useState, useEffect }*/ from "react";
import OrgsCard from "./orgs-card";
import Grid from '@mui/material/Grid';
import HarvestDataService from "../services/harvest.js";

import { faker } from '@faker-js/faker';
let ORGS = []
for (let index = 0; index < 20; index++) {
    ORGS[index] = {
        id: index,
        name: faker.company.name(),
        desc: faker.lorem.sentence(15),
        personal: Math.random() > 0.5
    }

}


const OrgsList = props => {
    const [orgs, setOrgs] = useState([]);

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
                        <Grid item key={org.id}>
                            <OrgsCard name={org.name} desc={org.description} personal={org.is_personal} key={org.id} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default OrgsList
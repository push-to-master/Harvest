import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

const OrgsCard = props => {
  //Retrieve information to display on card from props object
  const [orgName, setOrgName] = useState(props.name);
  const [orgDescription, setDescription] = useState(props.desc);
  const [isPersonal, setPersonal] = useState(props.personal);

  return (
    <Card  sx={{ maxWidth: 260 , height:280}}>
      <CardMedia
        component="img"
        height="30"
        sx={{ backgroundColor: isPersonal ? "green" : "blue" }}
      />
      <CardContent>
        {isPersonal ? <PersonIcon /> : <GroupsIcon />}
        <Typography gutterBottom variant="h5" component="div" maxHeight={100}>
          {orgName}
        </Typography>
        <Typography variant="body2" color="text.secondary" maxHeight={100}>
          {orgDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{bottom:0, top:'auto'}}>
      <Link to={"/logs"} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#b0e0b2",
            color: "black",
            "&:hover": {
              backgroundColor: "#89bf8e",
              color: "black"
            }
          }}
        endIcon={<ListIcon />}
        >
          Logs
        </Button>
        </Link>
        <Link to={"/show-graph"} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary"
        endIcon={<EqualizerIcon />}
        >
          View analytics
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default OrgsCard;

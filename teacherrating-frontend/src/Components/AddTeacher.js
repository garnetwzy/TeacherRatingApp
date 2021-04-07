import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    spacing: 50,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const handleSubmit = (event) => {
  event.preventDefault();
};

const universities = require("../university.json");
const fields = require("../study_field.json");

export default function AddTeacher() {
  const classes = useStyles();
  let history = useHistory();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Enter teacher's information
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="teacherName"
            label="Teacher's name"
            name="teacherName"
            autoComplete="email"
            autoFocus
          />
          <Autocomplete
            id="university"
            options={universities}
            getOptionLabel={(option) => option.institution}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="University" variant="outlined" margin="normal"/>
            )}
          />
          <Autocomplete
            id="field"
            options={fields}
            getOptionLabel={(option) => option.field}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Study of Field" variant="outlined" margin="normal"/>
            )}
          />

          <Button
            type=""
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              let formData = new FormData();
              let name = document.getElementById("teacherName").value
              let university =  document.getElementById("university").value
              let field = document.getElementById("field").value
              console.log(name)
              console.log(university)
              console.log(field)
              formData.append("name", name);
              formData.append("university", university);
              formData.append("field", field);
              const raw = await fetch("/addteacher", {
                method: "post",
                body: formData,
              });
              const res = await raw.json(); // parses JSON response into native JavaScript objects
              if (res.code === 400) {
                alert(res.message);
              } else if (res.code === 200) {
                alert("Teacher added successfully!");
                history.push("home");
              } else {
                  alert("The server has some errors, please try later!");
              }
            }}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
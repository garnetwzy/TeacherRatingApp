import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import universities from "../university.json";
import fields from "../study_field.json";

const TeacherSearchBar = () => {
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formData = new FormData();
    let name = document.getElementById("teacherName").value;
    let university = document.getElementById("university").value;
    let field = document.getElementById("field").value;
    formData.append("name", name);
    formData.append("university", university);
    formData.append("field", field);

    const response = await fetch("/dummy", {
      method: "get",
      body: formData,
    });
    const responseJson = await response.json();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          id="teacherName"
          label="Teacher's name"
          name="teacherName"
          autoComplete="email"
          autoFocus
        ></TextField>
        <Autocomplete
          id="university"
          options={universities}
          getOptionLabel={(option) => option.institution}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="University"
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <Autocomplete
          id="field"
          options={fields}
          getOptionLabel={(option) => option.field}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Study of Field"
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Container>
  );
};

export default TeacherSearchBar;

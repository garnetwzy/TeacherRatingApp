import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import universities from '../university.json';
import fields from '../study_field.json';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const TeacherSearchBar = ({ setPage, setQuery }) => {
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let name = document.getElementById('teacherName').value;
    let university = document.getElementById('university').value;
    let field = document.getElementById('field').value;
    let queryObj = new URLSearchParams();

    if (name !== '') {
      queryObj.append('name', name);
    }

    if (university !== '') {
      queryObj.append('university', university);
    }

    if (field !== '') {
      queryObj.append('field', field);
    }

    setQuery(queryObj.toString());
    setPage(1);
  };

  return (
    <Box marginLeft={0} marginRight={2}>
      <Grid
        container
        spacing={6}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <TextField
            margin="normal"
            fullWidth
            id="teacherName"
            label="Search teacher by name"
            name="teacherName"
            autoFocus
            // InputLabelProps={{
            //   style: { color: '#000', background: '#FFF' },
            // }}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            id="university"
            options={universities}
            getOptionLabel={(option) => option.institution}
            renderInput={(params) => (
              <TextField
                {...params}
                label="University"
                variant="outlined"
                margin="normal"
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            id="field"
            options={fields}
            getOptionLabel={(option) => option.field}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Field of Study"
                variant="outlined"
                margin="normal"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleSubmit}>
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherSearchBar;

TeacherSearchBar.propTypes = {
  setPage: PropTypes.func,
  setQuery: PropTypes.func,
};

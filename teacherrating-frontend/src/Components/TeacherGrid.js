import React from "react";
import "../App.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import TeacherItem from "./TeacherItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      alignItems: "flex-start",
      justify: "flex-start",
      spacing: theme.spacing(5),
    },
  })
);

export default function SpacingGrid() {
  const classes = useStyles();

  return (
    <div style={{ padding: 20 }}>
      <Grid container className={classes.container} spacing={3}>
        <Grid key={123} item xs={4}>
          <TeacherItem />
        </Grid>

        <Grid key={123} item xs={4}>
          <TeacherItem />
        </Grid>

        <Grid key={123} item xs={4}>
          <TeacherItem />
        </Grid>

        <Grid key={123} item xs={4}>
          <TeacherItem />
        </Grid>
      </Grid>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TeacherItem from "./TeacherItem";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    container: {
      alignItems: "flex-start",
      justify: "flex-start",
      spacing: theme.spacing(5),
    },
  })
);

const renderTeachers = (teachers) => {
  let res = [];
  for (let data of teachers) {
    res.push(
      <Grid key={data._id} item xs={4}>
        <TeacherItem teacher={data} />
      </Grid>
    );
  }
  return res;
};

export default function TeacherGrid() {
  const classes = useStyles();
  let [query, setQuery] = useState("");
  let [page, setPage] = useState(0);
  let [pageTotal, setPageTotal] = useState(10);
  let [teachers, setTeachers] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      console.log("start");
      const resRaw = await fetch(`./teachers?query=${query}&page=${page}`);
      const res = await resRaw.json();
      console.log("Got data", res);
      setTeachers(res.result);
      let totalPage = Math.ceil((res.count * 1.0) / 6);
      setPageTotal(totalPage);
    };

    console.log("Fetching DATA", query);
    fetchTeachers();

    return () => {
      console.log("Will unmount");
      //do any cleanup;
    };
  }, []);

  return (
    <Box width="100%" className={classes.root}>
      <Box width={1} p={1} my={0.5}>
        <div style={{ padding: 20 }}>
          <Grid container className={classes.container} spacing={3}>
            {renderTeachers(teachers)}
          </Grid>
        </div>
      </Box>
      <Grid container spacing={0} direction="column" alignItems="center">
        <Pagination count={pageTotal} color="primary" onChange={handleChange} />
      </Grid>
    </Box>
  );
}

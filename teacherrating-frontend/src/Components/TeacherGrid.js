import React, { useState, useEffect } from 'react';
import '../App.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TeacherItem from './TeacherItem';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import TeacherSearchBar from './TeacherSearchBar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    container: {
      alignItems: 'flex-start',
      justify: 'flex-start',
      spacing: theme.spacing(5),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
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
  let [query, setQuery] = useState('');
  let [page, setPage] = useState(1);
  let [pageTotal, setPageTotal] = useState(10);
  let [teachers, setTeachers] = useState([]);
  let [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      const resRaw = await fetch(`./teachers?${query}&page=${page - 1}`);
      const res = await resRaw.json();
      if (res.code === 403) {
        setLoading(false);
        history.push('/');
      } else {
        setLoading(false);
        setTeachers(res.result);
        let totalPage = Math.ceil((res.count * 1.0) / 6);
        setPageTotal(totalPage);
      }
    };
    fetchTeachers();
    return () => {
      //do any cleanup;
    };
  }, [page, query]);

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <div role="main">
        <Box width="100%" className={classes.root}>
          <Box width={1} p={1} my={0.5}>
            <TeacherSearchBar
              setPage={setPage}
              setQuery={setQuery}
            ></TeacherSearchBar>
            <div style={{ padding: 20 }}>
              <Grid container className={classes.container} spacing={3}>
                {renderTeachers(teachers)}
              </Grid>
            </div>
          </Box>
          <Grid container spacing={0} direction="column" alignItems="center">
            <Pagination
              count={pageTotal}
              page={page}
              color="primary"
              onChange={handleChange}
            />
          </Grid>
        </Box>
      </div>
    );
  }
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";

import { Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100vh",
    bgcolor: "info.light",
  },
  boxStyle: {
    wordWrap: "break-word",
  },
  paper: {
    height: "100vh",
    overflow: "auto",
  },
}));

export default function CommentsList(props) {
  const classes = useStyles();
  let arrayOfReviews = props.arrayOfReviews
  console.log("hhh")
  console.log(arrayOfReviews)
  
  const renderList = (reviews) => {
    let res = [];
    for (let data of reviews) {
      res.push(
        <div>
        <ListItem>
          <Box className={classes.boxStyle}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {data.title}
            </Typography>
            <Rating name="read-only" value={parseFloat(data.grade)} readOnly />
            <ListItemText
              primary={data.review}
              aria-multiline={true}
              secondary={data.date}
            />
          </Box>
        </ListItem>
        <Divider variant="middle" />
        </div>
      );
    }

    return res;
  }
  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <List>
          {renderList(arrayOfReviews)}
        </List>
      </Paper>
    </Box>
  );
}


CommentsList.propTypes = {
  arrayOfReviews: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    grade: PropTypes.string,
    review: PropTypes.string,
    date: PropTypes.string
  }))
};

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

export default function CommentsList() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <Box className={classes.boxStyle}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                dafsfs
              </Typography>
              <Rating name="read-only" value={3} readOnly />
              <ListItemText
                primary="WorkWor kWork  WorkWork WorkWork WorkWork WorkWork WorkWork WorkWor  WorkWork WorkWork WorkWor WorkWork WorkWork WorkWor"
                aria-multiline={true}
                secondary="Jan 7, 2014"
              />
            </Box>
          </ListItem>
          <Divider variant="middle" />

          <ListItem>
            <Box className={classes.boxStyle}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                dafsfs
              </Typography>
              <Rating name="read-only" value={3} readOnly />
              <ListItemText
                primary="WorkWor kWork  WorkWork WorkWork WorkWork WorkWork WorkWork WorkWor  WorkWork WorkWork WorkWor WorkWork WorkWork WorkWor"
                aria-multiline={true}
                secondary="Jan 7, 2014"
              />
            </Box>
          </ListItem>
          <Divider variant="middle" />

          <ListItem>
            <Box className={classes.boxStyle}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                dafsfs
              </Typography>
              <Rating name="read-only" value={3} readOnly />
              <ListItemText
                primary="WorkWor kWork  WorkWork WorkWork WorkWork WorkWork WorkWork WorkWor  WorkWork WorkWork WorkWor WorkWork WorkWork WorkWor"
                aria-multiline={true}
                secondary="Jan 7, 2014"
              />
            </Box>
          </ListItem>
          <Divider variant="middle" />

          <ListItem>
            <Box className={classes.boxStyle}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                dafsfs
              </Typography>
              <Rating name="read-only" value={3} readOnly />
              <ListItemText
                primary="WorkWor kWork  WorkWork WorkWork WorkWork WorkWork WorkWork WorkWor  WorkWork WorkWork WorkWor WorkWork WorkWork WorkWor"
                aria-multiline={true}
                secondary="Jan 7, 2014"
              />
            </Box>
          </ListItem>
          <Divider variant="middle" />

          <ListItem>
            <Box className={classes.boxStyle}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                dafsfs
              </Typography>
              <Rating name="read-only" value={3} readOnly />
              <ListItemText
                primary="WorkWor kWork  WorkWork WorkWork WorkWork WorkWork WorkWork WorkWor  WorkWork WorkWork WorkWor WorkWork WorkWork WorkWor"
                aria-multiline={true}
                secondary="Jan 7, 2014"
              />
            </Box>
          </ListItem>
          <Divider variant="middle" />

          <ListItem>
            <Box className={classes.boxStyle}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                dafsfs
              </Typography>
              <Rating name="read-only" value={3} readOnly />
              <ListItemText
                primary="WorkWor kWork  WorkWork WorkWork WorkWork WorkWork WorkWork WorkWor  WorkWork WorkWork WorkWor WorkWork WorkWork WorkWor"
                aria-multiline={true}
                secondary="Jan 7, 2014"
              />
            </Box>
          </ListItem>
          <Divider variant="middle" />
        </List>
      </Paper>
    </Box>
  );
}

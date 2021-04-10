import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory, useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import Image from "./background.jpg";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
  root: {},
  leftpart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    color: "primary.main",
    bgcolor: "info.light",
  },
  rightpart: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    marginTop: 10,
    height: "100vh",
    color: "primary.main",
    bgcolor: "info.light",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

}));

export default function TeacherDetail(props) {
  const classes = useStyles();
  let history = useHistory();
  let parsed = queryString.parse(window.location.search);
  const [open, setOpen] = React.useState(false);
  let id = parsed.id;
  let grade = 0;
  let [teacher, setTeacher] = useState(null);

  const [dialogOpen, setDialogOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  //   useEffect(() => {
  //     const fetchTeacher = async () => {
  //       const resRaw = await fetch(`./teacher?id=${id}`);
  //       const res = await resRaw.json();
  //       console.log("Got data", res);
  //       if (res.commentCount > 0) {
  //           grade = res.sumScores / res.commentCount;
  //       }
  //       setTeacher(res);
  //       setOpen(false);
  //     };
  //     fetchTeacher();
  //     return () => {
  //       //do any cleanup;
  //     };
  //   }, []);

  if (open) {
    return (
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <Box
        className={classes.root}
        width={1}
        display="flex"
        flexDirection="row"
      >
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
            <Box width={1} marginLeft={0} marginRight={2}>
            <DialogTitle id="form-dialog-title">Rate this teacher</DialogTitle>
          <DialogContent >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              fullWidth
              width = {1}
            />
            <Rating value={grade} />
            <Box marginRight={5} bgcolor="gray" width={1}>
                <Box width={1}>
                <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
              />
                </Box>
              
            </Box>
          </DialogContent>
            </Box>


          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
        <Box className={classes.leftpart} width={0.3} bgcolor="secondary.light">
          <div className={classes.paper}>
            <Box justifyContent="center">
              <Typography variant="h4" component="h2">
                {/* {teacher.name} */}
                Zhenyu Wang
              </Typography>
              <Box marginTop={1}>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  {/* {teacher.university} */}
                  Northeastern University
                  <br />
                  Computer science
                </Typography>
              </Box>

              <Box marginTop={1}>
                <Typography variant="body" component="p">
                  average score of 0 reviews
                  {/* average score of {teacher.commentCount} reviews */}
                </Typography>
              </Box>

              <Box marginTop={1}>
                <Rating name="read-only" value={grade} readOnly />
              </Box>

              <Button
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                Rate this teacher right now!
              </Button>
            </Box>
          </div>
        </Box>
        <Box className={classes.rightpart} width={0.7}>
          <Box marginLeft={2}>
            <Typography variant="h4" component="h2" align="left">
              Reviews
            </Typography>
          </Box>
          <CommentsList></CommentsList>
        </Box>
      </Box>
    );
  }
}

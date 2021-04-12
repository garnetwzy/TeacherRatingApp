import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentsList from "./CommentsList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

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

export default function TeacherDetail() {
  const classes = useStyles();

  let parsed = queryString.parse(window.location.search);
  let id = parsed.id;

  const [open, setOpen] = useState(true);
  // review related data
  let [value, setValue] = useState(0);
  let [title, setTitle] = useState("");
  let [review, setReview] = useState("");
  let [grade, setGrade] = useState(0);
  let [teacher, setTeacher] = useState(null);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return mm + "-" + dd + "-" + yyyy;
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const submitReview = async () => {
    let date = getCurrentDate();
    let formData = new FormData();
    formData.append("date", date);
    formData.append("grade", value);
    formData.append("title", title);
    formData.append("review", review);
    formData.append("id", id);
    const raw = await fetch("/updateteacher", {
      method: "post",
      body: formData,
    });
    const res = await raw.json(); // parses JSON response into native JavaScript objects
    if (res.code === 200) {
        window.location.reload();
    } else {
      alert("no such user or wrong passcode.");
    }
  };

    useEffect(() => {
      const fetchTeacher = async () => {
        const resRaw = await fetch(`./teacher?id=${id}`);
        const res = await resRaw.json();
        if (res.commentCount > 0) {
            setGrade(res.sumScores / res.commentCount);
        }
        setTeacher(res);
        setOpen(false);
      };
      fetchTeacher();
      return () => {
        //do any cleanup;
      };
    }, []);

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
          bgcolor="red"
        >
          <Box width={1} marginLeft={0} marginRight={50}>
            <DialogTitle id="form-dialog-title">Rate this teacher</DialogTitle>
            <DialogContent>
              <TextField
                
                margin="dense"
                id="name"
                label="Title"
                fullWidth
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(evt) => {
                  setValue(evt.target.value);
                }}
              />
              <Box display="flex" lexDirection="row" width={1} marginTop={1}>
                <TextField
                  label="Review"
                  multiline
                  fullWidth
                  rows={4}
                  variant="outlined"
                  value={review}
                  onChange={(event) => {
                    setReview(event.target.value);
                  }}
                />
              </Box>
            </DialogContent>
          </Box>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submitReview} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Box className={classes.leftpart} width={0.3} bgcolor="info.light">
          <div className={classes.paper}>
            <Box justifyContent="center">
              <Typography variant="h4" component="h2">
                {teacher.name}
              </Typography>
              <Box marginTop={1}>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  {teacher.university}
                  <br />
                  {teacher.field}

                </Typography>
              </Box>

              <Box marginTop={1}>
                <Typography variant="body" component="p">
                  average score of {teacher.commentCount} reviews
                </Typography>
              </Box>

              <Box marginTop={1}>
                <Rating name="read-only" value={grade} readOnly />
              </Box>

              <Button color="primary"
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
          <CommentsList arrayOfReviews={teacher.comments}></CommentsList>
        </Box>
      </Box>
    );
  }
}

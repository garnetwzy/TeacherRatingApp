import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TeacherItem(props) {
  const classes = useStyles();
  console.log(props.teacher.commentCount)
  let history = useHistory();
  let grade = 0
  if (props.teacher.commentCount > 0) {
      grade = props.teacher.sumScores * 1.0 / props.teacher.commentCount
  }
  return (
    <Box boxshadow={4}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.teacher.university}
          </Typography>
          <Typography variant="h5" component="h2">
          {props.teacher.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          {props.teacher.field}
          </Typography>
          <Typography variant="body2" component="p">
            average score of {props.teacher.commentCount} reviews
          </Typography>
          <Rating name="read-only" value={grade} readOnly/>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {
              history.push(`/detail?id=${props.teacher._id}`)
          }}>Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

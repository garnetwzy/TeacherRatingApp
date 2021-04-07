import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TeacherItem() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Northeastern University
        </Typography>
        <Typography variant="h5" component="h2">
          Zhenyu Wang
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Computer Science
        </Typography>
        <Typography variant="body2" component="p">
          average score
        </Typography>
        <Rating
          name="simple-controlled"
          value={3}
          onChange={(event, newValue) => {
            
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
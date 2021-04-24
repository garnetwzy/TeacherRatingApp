import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

// const theme = createMuiTheme({
//   typography: {
//     // In Chinese and Japanese the characters are usually larger,
//     // so a smaller fontsize may be appropriate.
//     htmlFontSize: 1,
//   },
// });

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: '#1976d2' }}>
        <Toolbar>
          <Button
            color="inherit"
            hidden={true}
            disableRipple={true}
            onClick={() => {
              history.push('/home');
            }}
          >
            <Typography
              variant="h1"
              style={{ fontSize: 20, fontWeight: 700 }}
              noWrap
            >
              Teacher Rating
            </Typography>
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.showBar && (
              <Button
                color="inherit"
                hidden={true}
                onClick={() => {
                  history.push('/addteacher');
                }}
              >
                Add Teacher
              </Button>
            )}

            <Button
              color="inherit"
              hidden={true}
              onClick={async () => {
                await fetch('/logout');
                history.push('/');
              }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

PrimarySearchAppBar.propTypes = {
  showBar: PropTypes.bool,
};

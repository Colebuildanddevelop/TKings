import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "react-router-dom/Link";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    marginRight: 30
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to={"/"} variant="h4" color="inherit" className={classes.title}>
            STONKKINGS
          </Typography>
          <Typography component={Link} to={"/"} variant="h6" color="inherit" className={classes.title}>
            Lobby
          </Typography>
          <Typography component={Link} to={"/"} variant="h6" color="inherit" className={classes.title}>
            My Tournaments
          </Typography>
          <Typography component={Link} to={"/"} variant="h6" color="inherit" style={{flexGrow: 1}} className={classes.title}>
            Leaderboard        
          </Typography>
          <Button component={Link} to={"/login"} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
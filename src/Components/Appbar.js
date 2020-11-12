import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {ThemeContext} from './Darkmode'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
}));

const Appbar = () => {
    const classes = useStyles();
    const { switched, toggle} = useContext(ThemeContext);
    return (
        <div>

            <AppBar position="static" style={{backgroundColor: switched.background, color: switched.color}}>
                
                <Toolbar>
                    <IconButton aria-label="light" color="inherit" 
                        className={classes.title} 
                        onClick={toggle}>
                
                        <Brightness4Icon />
                
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Appbar; 
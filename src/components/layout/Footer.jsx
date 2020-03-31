import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    root : {
        gridArea: 'footer',
        backgroundColor : '#25364D'
    }
});

export default function Footer(){
    const classes = useStyles();
    return (
        <footer className={classes.root}>

        </footer>
    )
}
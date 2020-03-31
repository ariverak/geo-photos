/* eslint-disable import/no-unresolved */
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Heading } from 'evergreen-ui'
// import { useHistory } from 'react-router-dom';

const useStyles = createUseStyles({
    root : { }
});

const HomePage = () => {
    const classes = useStyles();
    // const history = useHistory();

    return (
        <div className={classes.root}>
            <Heading size={800}>
                Hello World
            </Heading>
        </div>
    )
}
export default HomePage;
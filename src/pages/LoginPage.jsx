/* eslint-disable import/no-unresolved */
import React from 'react';
import { createUseStyles } from 'react-jss';
import LoginForm from "components/login/LoginForm";

const useStyles = createUseStyles({
    root : { }
});

const LoginPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LoginForm />
        </div>
    )
}
export default LoginPage;
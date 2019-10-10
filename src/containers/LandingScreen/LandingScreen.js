import React, { Component } from 'react';
import classes from './LandingScreen.module.css';
import preAuthorization from '../../components/Session/preAuthorization';
import { withStyles } from '@material-ui/core/styles';
import * as ROUTES from '../../constants/routes';
import { Button } from '@material-ui/core';

const LandingButton = withStyles({
    root: {
        margin: '0',
        height: '60px',
        padding: 'auto',
        alignSelf: 'center',
        backgroundColor: '#EEF0F1',
        borderColor: '#444444',
        textTransform: 'none',
        fontSize: '18px',

        '&:hover': {
            backgroundColor: '#FF4D3D',
            borderColor: 'white',

            '& .MuiButton-label': {
                color: 'white',
                fontWeight: '600',
            },
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#FF4D3D',
            borderColor: 'white',
        },

        '& .MuiButton-root': {

            '&:hover': {
                color: '#FF4D3D',
            },
            '&.Mui-focused': {
                color: '#FF4D3D',
            },
        },

        '& .MuiButton-label': {
            color: '#6E6E6E',
            fontWeight: '600',
        },

    }
})(Button);

class LandingScreen extends Component {

    signUp = () => {
        this.props.history.push(ROUTES.SIGN_UP);
    }

    login = () => {
        this.props.history.push(ROUTES.LOGIN);
    }

    render() {
        return (
            <div className={classes.LandingScreen}>
                <div className={classes.Box}>
                    <h1>SmartList</h1>
                    <p>A smart to-do list for creating, managing, and tracking your tasks.</p>
                    <p>Created by Sebastien Lubrano.</p>
                </div>
                <div className={classes.ButtonContainer}>
                    <LandingButton
                        variant="contained"
                        className={classes.button}
                        size='large'
                        margin='normal'
                        color='default'
                        fullWidth
                        onClick={this.login}
                    >
                        Log In
                    </LandingButton>
                </div>
                <div className={classes.ButtonContainer}>
                    <LandingButton
                        variant="contained"
                        className={classes.button}
                        size='large'
                        margin='normal'
                        color='default'
                        fullWidth
                        onClick={this.signUp}
                    >
                        Sign Up
                    </LandingButton>
                </div>
            </div>
        );
    }
}

const condition = authUser => !!authUser;

export default preAuthorization(condition)(LandingScreen);
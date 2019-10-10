import React, { Component } from 'react';
import classes from './LoginScreen.module.css';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../../components/Session';

const FormTextField = withStyles({
    root: {
        margin: 'auto', 
        marginTop: '40px',
        padding: 'auto',
        alignSelf: 'center',

        '& label.Mui-focused': {
            color: '#07689F',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#07689F',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#444444',
            },
            '&:hover fieldset': {
              borderColor: '#07689F',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#07689F',
            },
          },
    }
  })(TextField);

  const FormButton = withStyles({
    root: {
        margin: 'auto', 
        marginTop: '50px',
        padding: 'auto',
        alignSelf: 'center',
        height: '50px',
        backgroundColor: '#07689F',
        borderColor: '#444444',

        '&:hover': {
            backgroundColor: '#FF4D3D',
            borderColor: '#FF4D3D',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#FF4D3D',
            borderColor: '#444444',
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
            color: 'white',
            fontWeight: '600',
        },

    }
  })(Button);

  const SignUpButton = withStyles({
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

class LoginScreen extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        error: null
    };

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = () => {
        this.props.firebase
            .doSignInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push(ROUTES.TASKS);
            })
            .catch(error => {
                console.log(error);
                this.setState({ error });
            });
    }

    signUp = () => {
        this.props.history.push(ROUTES.SIGN_UP);
    }

    render() {

        const isInvalid = this.state.password === '' || this.state.email === '';

        return (

            <AuthUserContext.Consumer>
                {authUser =>
                    <div className={classes.LoginScreen}>
                        <div className={classes.Box}>
                            <p className={classes.TitleArea}>Log In</p>
                            <form
                                className={classes.Form}
                                noValidate autoComplete='off'
                            >
                                <FormTextField
                                    label='Email'
                                    value={this.state.email}
                                    onChange={event => this.handleEmailChange(event)}
                                    type='text'
                                    variant="outlined"
                                    fullWidth
                                    margin='normal'
                                    required
                                />
                                <FormTextField
                                    label='Password'
                                    value={this.state.password}
                                    onChange={event => this.handlePasswordChange(event)}
                                    type='password'
                                    variant="outlined"
                                    fullWidth
                                    margin='normal'
                                    required
                                />
                                <FormButton
                                    variant="contained"
                                    className={classes.button}
                                    size='large'
                                    margin='normal'
                                    color='default'
                                    fullWidth
                                    onClick={this.handleSubmit}
                                    disabled={isInvalid}
                                >
                                    Submit
                            </FormButton>
                            </form>
                            <p className={classes.ErrorP}>
                                {(this.state.error !== null) ? this.state.error.message : null}
                            </p>
                        </div>
                        <div className={classes.GoogleSignIn}>
                            <SignUpButton
                                variant="contained"
                                className={classes.button}
                                size='large'
                                margin='normal'
                                color='default'
                                fullWidth
                                onClick={this.signUp}
                            >
                                Sign Up
                                </SignUpButton>
                        </div>
                    </div>
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default LoginScreen;
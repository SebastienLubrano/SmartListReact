import React, { Component } from 'react';
import classes from './SettingsScreen.module.css';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as ROUTES from '../../constants/routes';
import Switch from "react-switch";
import { connect } from 'react-redux';
import * as actionTypes from '../../constants/reduxActions';
import { withAuthorization } from '../../components/Session';



const SignOutButton = withStyles({
    root: {
        margin: 'auto', 
        marginTop: '50px',
        padding: 'auto',
        alignSelf: 'center',
        height: '50px',
        backgroundColor: '#EEF0F1',
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
            color: '#FF4D3D',
            fontWeight: '600',

            '&:hover': {
                color: '#ffffff',
            },
            '&.Mui-focused': {
                color: '#ffffff',
            },
        },

    }
  })(Button);


class SettingsScreen extends Component {

    state = {
        user: null,
        error: null
    }

    taskListener = null;

    handleSubmit = () => {
        this.props.firebase
            .doSignOut()
            .then(() => {
                this.props.history.push(ROUTES.LOGIN);
            })
            .catch(error => {
                console.log(error);
                this.setState({ error });
            });
    }

    handleHideCompleted = () => {
        if (this.props.authUser !== null) {
            let userRef = this.props.firebase.db.collection('users').doc(this.props.authUser.uid);

            this.props.firebase.db.runTransaction(transaction => {
                return transaction.get(userRef).then(userDoc => {
                    if (userDoc.exists) {
                        let oldHideCompleted = userDoc.data().hideCompleted || false;
                        transaction.update(userRef, { hideCompleted: !oldHideCompleted});
                    }
                });
            }).then(() => {
                console.log('Success switching completed!');
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleShowCompleted = () => {
        if (this.props.authUser !== null) {
            let userRef = this.props.firebase.db.collection('users').doc(this.props.authUser.uid);

            this.props.firebase.db.runTransaction(transaction => {
                return transaction.get(userRef).then(userDoc => {
                    if (userDoc.exists) {
                        let oldHideCompleted = userDoc.data().hideCompleted || true;
                        transaction.update(userRef, { hideCompleted: !oldHideCompleted});
                    }
                });
            }).then(() => {
                console.log('Success switching completed!');
            }).catch(err => {
                console.log(err);
            });
        }
    }

    componentDidMount = () => {
        if (this.props.authUser !== null) {
            this.taskListener = this.props.firebase.db.collection('users').doc(this.props.authUser.uid)
            .onSnapshot(doc => {
                if (doc.exists) {
                    let userData = doc.data();
                    userData.id = doc.id;
                    this.props.onUpdateUser(userData);
                }
            });
        }
    }

    componentWillUnmount() {
        if (this.taskListener !== null) {
            this.taskListener()
        }
    }

    render() {
        let hideCompleted = false;
        if (this.props.user !== null) {
            if (this.props.user.hideCompleted !== null) {
                hideCompleted = this.props.user.hideCompleted;
            }
        }


        return (
            <div className={classes.SettingsScreen}>
                <div className={classes.HideCompletedBox}>
                    <p>Hide Completed</p>
                    <div className={classes.SwitchContainer}>
                        <Switch 
                            onChange={this.handleHideCompleted} 
                            checked={hideCompleted}
                            onColor='#07689F' />
                    </div>
                </div>
                <div className={classes.SignOutButtonContainer}>
                    <SignOutButton
                        variant="contained"
                        className={classes.button}
                        size='large'
                        margin='normal'
                        color='default'
                        fullWidth
                        onClick={this.handleSubmit}
                    >Sign Out</SignOutButton>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: (user) => dispatch({type: actionTypes.UPDATE_USER_DOC, payload: {user: user}})
    };
};

const condition = authUser => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(condition)(SettingsScreen));
import React, { Fragment } from 'react';
import classes from './NavItems.module.css';
import NavItem from '../NavItem/NavItem';
import { withRouter } from 'react-router-dom';

const navItems = (props) => { 

    let attachedClasses = [classes.NavItems, classes.Auth];

    if (!props.authUser) {
        attachedClasses = [classes.NavItems, classes.NotAuth];
    }

    let authNavLinks = (
        <ul className={attachedClasses.join(' ')}>
            
            <NavItem 
                link='/tasks'
                active={props.location.pathname === "/tasks"}
                authUser={props.authUser}
                clicked={props.clicked}
            >
                Tasks
            </NavItem>
            <NavItem 
                link='/lists'
                active={props.location.pathname === "/lists"}
                authUser={props.authUser}
                clicked={props.clicked}
            >
                Lists
            </NavItem>
            <NavItem
                link='/analytics'
                active={props.location.pathname === "/analytics"}
                authUser={props.authUser}
                clicked={props.clicked}
            >
                Analytics
            </NavItem>
            <NavItem
                link='/settings'
                active={props.location.pathname === "/settings"}
                authUser={props.authUser}
                clicked={props.clicked}
            >
                Settings
            </NavItem>
        </ul>
    );

    let notAuthNavLinks = (
        <ul className={attachedClasses.join(' ')}>
            <NavItem
                link='/login'
                active={props.location.pathname === "/login"}
                authUser={props.authUser}
                clicked={props.clicked}
            >
                Log In
            </NavItem>
            <NavItem
                link='/signup'
                active={props.location.pathname === "/signup"}
                authUser={props.authUser}
                clicked={props.clicked}
            >
                Sign Up
            </NavItem>
        </ul>
    );

    return (
        <Fragment>
            {props.authUser ? authNavLinks : notAuthNavLinks}
        </Fragment>
    );
}
export default withRouter(navItems);
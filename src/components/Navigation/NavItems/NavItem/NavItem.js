import React from 'react';
import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const navItem = (props) => {

    let attachedClasses = [classes.NavItem, classes.Auth];

    if (!props.authUser) {
        attachedClasses = [classes.NavItem, classes.NotAuth];
    }

    return (
        <li className={attachedClasses.join(' ')}>
            <NavLink
                to={props.link}
                exact
                className={props.active ? classes.active : null}
                onClick={props.clicked}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default navItem;
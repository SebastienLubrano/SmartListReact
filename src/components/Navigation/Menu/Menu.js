import React from 'react';
import classes from './Menu.module.css';

const menu = (props) => {

    let attachedClasses = [classes.Menu, classes.Auth];

    if (!props.authUser) {
        attachedClasses = [classes.Menu, classes.NotAuth];
    }

    return (
        <div
            onClick={props.clicked}
            className={attachedClasses.join(" ")}
        >
            <div />
            <div />
            <div />
        </div>
    );
};

export default menu;
import React from 'react';
import classes from './Logo.module.css';

const logo = (props) => (
    <p className={classes.Logo} style={{height: props.height}}><strong>To-Do</strong></p>
);

export default logo;
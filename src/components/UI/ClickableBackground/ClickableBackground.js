import React from 'react';
import classes from './ClickableBackground.module.css';

const ClickableBackground = (props) => (
    <div 
        className={classes.ClickableBackground}
        onClick={props.clicked}
    ></div>
);

export default ClickableBackground;
import React from 'react';
import classes from './TaskItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import moment from 'moment';

const taskItem = (props) => {

    let notSelectedIconStyle = {
        'color' : '#6E6E6E',
        "borderColor": "#6E6E6E",
        "margin": "auto",
    };

    let selectedIconStyle = {
        'color' : '#07689F',
        "borderColor": "#07689F",
        "margin": "auto",
    };

    let dueDateArea = null;

    if (props.task.dueDate !== null) {
        dueDateArea = (
            <div className={classes.DueDateArea}>
                <p className={(props.task.dueDate > Date.now()) ? classes.Upcoming : classes.Overdue}>Due {moment(props.task.dueDate).fromNow()}</p>
            </div>
        );
    }

    return (
        <div className={classes.TaskItemBox}>
            <div className={classes.TaskItem}>
                <Link to={'/tasks/' + props.task.id}>
                    <Textarea
                        value={props.task.name}
                        disabled
                        maxRows={10}
                        style={props.task.completed ? { 'textDecoration': 'line-through' } : { 'textDecoration': 'none' }}
                    />
                </Link>
                <button onClick={() => props.toggleTask(props.task.id)}>
                    <FontAwesomeIcon
                        icon={props.task.completed ? SolidIcons.faCircle : RegularIcons.faCircle}
                        size="3x"
                        style={props.task.completed ? selectedIconStyle : notSelectedIconStyle}
                    />
                </button>
            </div>
            {dueDateArea}
        </div>
    );
}

export default taskItem;
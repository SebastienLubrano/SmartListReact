import React from 'react';
import classes from './CreateTaskItem.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Textarea from 'react-textarea-autosize';

const createTaskItem = (props) => {

    let iconStyle = {
        "color": "#FF7E67",
        "margin": "auto 0px auto 0px",
        'border' : 'none',
        'alignSelf' : 'center'
    };

    return (
        <div className={classes.CreateTaskItemBox}>
            <div className={classes.CreateTaskItem}>
                <button onClick={props.newTaskSubmit}>
                    <FontAwesomeIcon
                        icon={Icons.faPlusCircle}
                        size="3x"
                        style={iconStyle}
                    />
                </button>
                <Textarea
                    className={classes.TaskNameP}
                    value={props.newTaskName}
                    onChange={event => props.newTaskChanged(event)}
                    onKeyPress={event => props.newTaskKeyPressed(event)}
                    maxRows={10}
                    placeholder='Create New Task'
                />
            </div>
        </div>
    );
}

export default createTaskItem;
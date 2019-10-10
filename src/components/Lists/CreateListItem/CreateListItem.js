import React from 'react';
import classes from './CreateListItem.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Textarea from 'react-textarea-autosize';

const createListItem = (props) => {

    let iconStyle = {
        "color": "#FF7E67",
        "margin": "auto 0px auto 0px",
        'border' : 'none',
        'alignSelf' : 'center'
    };

    return (
        <div className={classes.CreateListItemBox}>
            <div className={classes.CreateListItem}>
                <button onClick={props.newListSubmit}>
                    <FontAwesomeIcon
                        icon={Icons.faPlusCircle}
                        size="3x"
                        style={iconStyle}
                    />
                </button>
                <Textarea
                    className={classes.ListNameP}
                    value={props.newListName}
                    onChange={event => props.newListChanged(event)}
                    onKeyPress={event => props.newListKeyPressed(event)}
                    maxRows={10}
                    placeholder='Create New List'
                />
            </div>
        </div>
    );
}

export default createListItem;
import React from 'react';
import classes from './ListItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import Textarea from 'react-textarea-autosize';

const listItem = (props) => {

    let iconStyle = {
        'color' : '#DA3A3B',
        "margin": "auto",
    };

    return (
        <div className={classes.ListItemBox}>
            <div className={classes.ListItem}>
                <Textarea
                    value={props.list.name}
                    disabled
                    maxRows={3}
                />
                <button onClick={() => props.deleteList(props.list.id)}>
                    <FontAwesomeIcon
                        icon={RegularIcons.faTrashAlt}
                        size='3x'
                        style={iconStyle}
                    />
                </button>
            </div>
        </div>
    );
}

export default listItem;
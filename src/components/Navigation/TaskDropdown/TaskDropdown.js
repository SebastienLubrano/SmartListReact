import React, { Component, Fragment } from 'react';
import ReactDropdown from 'react-dropdown';
import './TaskDropdown.css';

class TaskDropdown extends Component {

    options = ['All Tasks', 'Create New List', 'Shopping List'];

    render() {
        return (
            <Fragment>
                <ReactDropdown
                    options={this.options}
                    value={this.options[0]}
                    className='Dropdown'
                    baseClassName='Dropdown'
                />
            </Fragment>
        );
    }
}
export default TaskDropdown;

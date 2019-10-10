import React from 'react';
import './TaskOptions.css';
import Dropdown from 'react-dropdown';
import Switch from 'react-switch';


const taskOptions = (props) => {

    return (
        <div className='TaskOptions'>
            <div className='TaskOptionsListContainer'>
                <Dropdown
                    options={props.options}
                    value={props.optionsValue}
                    className='DropdownMain'
                    baseClassName='DropdownMain'
                    onChange={option => props.onSelect(option)}
                />
                <div className='HideCompletedContainer'>
                    <p>Hide Completed</p>
                    <Switch
                        onChange={props.handleHideCompleted}
                        checked={props.hideCompleted}
                        onColor='#07689F' 
                        className='SwitchButton'
                    />
                </div>
            </div>
        </div>
    );
}

export default taskOptions;
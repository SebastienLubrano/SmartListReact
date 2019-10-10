import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isMobile } from 'react-device-detect';
import Dropdown from 'react-dropdown';
import Moment from 'react-moment';
import Textarea from 'react-textarea-autosize';
import './FullTask.css';


const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly={isMobile} />
  );

const FullTask = (props) => {

    let notSelectedIconStyle = {
        'color': '#6E6E6E',
        "marginTop": "auto",
        "marginBottom": "auto",
        "height": '80%'
    };

    let selectedIconStyle = {
        'color': '#07689F',
        "marginTop": "auto",
        "marginBottom": "auto",
        "height": '80%'
    };

    let trashIconStyle = {
        'color': '#DA3A3B',
        "marginTop": "auto",
        "marginBottom": "auto",
        "height": '80%'
    };

    let pastDateCheck = false;

    if (props.task.dueDate !== null) {
        if (props.task.dueDate < new Date()) {
            pastDateCheck = true;
        }
    }

    return (
        <div className='FullTask'>
            <div className='FullTaskContentArea'>
                <div className='TopArea'>
                    <Textarea
                        className='TextArea'
                        value={props.task.name}
                        onChange={event => props.taskNameChanged(event)}
                        onBlur={event => props.taskNameSubmit(event)}
                        maxRows={3}
                        style={props.task.completed ? { 'textDecoration': 'line-through' } : { 'textDecoration': 'none' }}
                    />
                    <button onClick={() => props.toggleTask(props.task.id)}>
                        <FontAwesomeIcon
                            icon={props.task.completed ? SolidIcons.faCircle : RegularIcons.faCircle}
                            size="3x"
                            style={props.task.completed ? selectedIconStyle : notSelectedIconStyle}
                        />
                    </button>
                </div>
                <div className='OptionsArea'>
                    <div className='ListArea'>
                        <button className='ListButton'>
                            <FontAwesomeIcon
                                icon={RegularIcons.faListAlt}
                                size="3x"
                                style={notSelectedIconStyle}
                            />
                        </button>
                        <Dropdown
                            options={props.options}
                            value={props.optionsValue}
                            className='Dropdown'
                            baseClassName='Dropdown'
                            onChange={option => props.onSelect(option)}
                        />
                    </div>
                    <div className='DateArea'>
                        <button className='DateAreaButton'>
                            <FontAwesomeIcon
                                icon={RegularIcons.faCalendarAlt}
                                size="3x"
                                style={!pastDateCheck ? notSelectedIconStyle : trashIconStyle}
                            />
                        </button>
                        <DatePicker
                            className={!pastDateCheck ? 'DatePickerStyling' : 'DatePickerStylingPast'}
                            placeholderText='Add a Due Date'
                            selected={props.task.dueDate}
                            onChange={date => props.dateChanged(date)}
                            fixedHeight={true}
                            withPortal={isMobile}
                            customInput={<DatepickerInput />}
                        />
                    </div>

                </div>

                <div className='NoteArea'>
                    <Textarea
                        className='NoteTextArea'
                        value={props.task.note}
                        placeholder='Add a Note'
                        onChange={event => props.noteChanged(event)}
                        maxRows={5}
                        onBlur={event => props.noteSubmit(event)}
                    />
                </div>
                <div className='BottomArea'>
                    <Moment fromNow>{props.task.timeStamp}</Moment>
                    <button
                        className='RemoveButton'
                        onClick={props.deleteTask}>
                        <FontAwesomeIcon
                            icon={RegularIcons.faTrashAlt}
                            size="3x"
                            style={trashIconStyle}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FullTask;
import React, { Fragment } from 'react';
import classes from './Sidebar.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavItems from '../NavItems/NavItems/NavItems';

const sidebar = (props) => {

    let attachedClasses = [classes.Sidebar, classes.Close];

    if (props.open) {
        attachedClasses = [classes.Sidebar, classes.Open];
    }

    return (
        <Fragment >
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Backdrop />
                <nav>
                    <NavItems authUser={props.authUser} clicked={props.closed}/>
                </nav>
            </div>
        </Fragment>
        
    );
}

export default sidebar;
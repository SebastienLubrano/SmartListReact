import React, { Fragment, Component } from 'react';
import Menu from '../Menu/Menu';
import classes from './Toolbar.module.css';
import NavItems from '../NavItems/NavItems/NavItems';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';


class Toolbar extends Component {


    goBack = () => {
        this.props.history.goBack();
    }

    render() {

        let attachedClasses = [classes.Toolbar, classes.Auth];

        if (!this.props.authUser) {
            attachedClasses = [classes.Toolbar, classes.NotAuth];
        }

        let splitPath = this.props.location.pathname.split('/');
        let showBackButton = false;

        if (splitPath.length === 3) {
            if (splitPath[1] === 'tasks') {
                showBackButton = true;
            }
        }

        let leftIcon = (
            <Fragment>
                <Menu
                    clicked={this.props.sidebarToggleClicked}
                    authUser={this.props.authUser}
                />
                <div className={classes.Logo}>
                    <p>SmartList</p>
                </div>
            </Fragment>

        );

        if (showBackButton) {

            leftIcon = (
                <Fragment>
                    <button onClick={this.goBack} className={classes.BackButtonContainer}>
                        <FontAwesomeIcon
                            icon={SolidIcons.faChevronLeft}
                            size="3x"
                            style={{ 'color': '#ffffff' }}
                        />
                    </button>

                </Fragment>
            );
        }


        return (
            <header className={attachedClasses.join(' ')}>
                {leftIcon}
                <nav className={classes.DesktopOnly}>
                    <NavItems
                        authUser={this.props.authUser}
                    />
                </nav>
            </header>
        );
    }

}

export default withRouter(Toolbar);
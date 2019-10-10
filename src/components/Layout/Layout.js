import React, { Component, Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import classes from './Layout.module.css';
import { AuthUserContext } from '../Session';

class Layout extends Component {

    state = {
        showSidebar: false
    }

    sidebarClosedHandler = () => {
        this.setState({showSidebar: false});
    }

    sidebarToggleHandler = () => {
        this.setState((prevState) => {
            return {showSidebar: !prevState.showSidebar};
        });
    }


    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    <Fragment>
                        <Toolbar
                            sidebarToggleClicked={this.sidebarToggleHandler}
                            authUser={authUser !== null}
                        />
                        <Sidebar
                            closed={this.sidebarClosedHandler}
                            open={this.state.showSidebar}
                            authUser={authUser !== null}
                        />
                        <main className={classes.Content}>
                            {this.props.children}
                        </main>
                    </Fragment>
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default Layout;
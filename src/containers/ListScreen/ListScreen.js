import React, { Component } from 'react';
import classes from './ListScreen.module.css';
import { withAuthorization } from '../../components/Session';
import ListItems from '../../components/Lists/ListItems/ListItems';
import { connect } from 'react-redux';
import * as actionTypes from '../../constants/reduxActions';


class ListScreen extends Component {

    state = {
        newListName: '',
    }

    listListener = null;
    

    handleCreateNewListChange(event) {
        this.setState({newListName: event.target.value});
    }

    handleCreateNewListKeyPress = (event) => {
        if (this.state.newListName !== undefined) {
            if (this.state.newListName !== '') {
                if (event.key === 'Enter') {
                    this.setState({ newListName: '' });

                    let newListItem = {
                        'name': this.state.newListName,
                        'createdTimeStamp': Date.now(),
                        'timeStamp': Date.now(),
                        'authorID': this.props.authUser.uid
                    }

                    this.props.firebase.db.collection('lists')
                        .add(newListItem);
                    event.preventDefault();
                }
            }
        }
    }

    handleCreateNewListSubmit = () => {
        if (this.state.newListName !== undefined) {
            if (this.state.newListName !== '') {
                this.setState({ newListName: '' });

                let newListItem = {
                    'name': this.state.newListName,
                    'createdTimeStamp': Date.now(),
                    'timeStamp': Date.now(),
                    'authorID': this.props.authUser.uid
                }

                this.props.firebase.db.collection('lists')
                    .add(newListItem);
            }
        }
    }

    handleDeleteList = (listId) => {
        this.props.firebase.db.collection('lists').doc(listId)
            .delete()
    }


    componentDidMount() {
        if (this.props.authUser !== null) {
            this.listListener = this.props.firebase.db.collection('lists')
                .orderBy('createdTimeStamp', 'desc')
                .where('authorID', '==', this.props.authUser.uid)
                .onSnapshot(querySnapshot => {
                    let newListItems = [];

                    querySnapshot.forEach((doc) => {
                        let newListItem = doc.data();
                        newListItem.id = doc.id;
                        newListItems.push(newListItem);
                    });
                    this.props.onUpdateLists(newListItems);
                });
        }
    }


    componentWillUnmount() {
        if (this.listListener !== null) {
            this.listListener()
        }
    }

    render() {
        return (
            <div className={classes.ListScreen}>
                <ListItems
                    lists={this.props.reduxLists}
                    newListChanged={event => this.handleCreateNewListChange(event)}
                    newListSubmit={this.handleCreateNewListSubmit}
                    newListName={this.state.newListName}
                    newListKeyPressed={event => this.handleCreateNewListKeyPress(event)}
                    deleteList={listId => this.handleDeleteList(listId)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxLists: state.lists,
        reduxAuthUser: state.authUser,
        reduxUser: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateLists: (lists) => dispatch({type: actionTypes.UPDATE_LISTS, payload: {lists: lists}})
    };
};

const condition = authUser => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(condition)(ListScreen));
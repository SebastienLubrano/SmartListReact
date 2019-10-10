import React, { Component, Fragment } from 'react';
import TaskItems from '../../components/Tasks/TaskItems/TaskItems';
import { withAuthorization } from '../../components/Session';
import { AuthUserContext } from '../../components/Session';
import classes from './TaskScreen.module.css';
import TaskOptions from '../../components/TaskOptions/TaskOptions';
import { connect } from 'react-redux';
import * as actionTypes from '../../constants/reduxActions';


class TaskScreen extends Component {

    state = {
        newTaskName: '',
        notLoaded: true
    }

    userListener = null;
    taskListener = null;
    listListener = null;

    handleCreateNewTaskChange(event) {
        this.setState({newTaskName: event.target.value});
    }

    handleCreateNewTaskKeyPress = (event) => {
        if (this.state.newTaskName !== undefined) {
            if (this.state.newTaskName !== '') {
                if (event.key === 'Enter') {
                    this.setState({ newTaskName: '' });

                    let newTask = {
                        'name': this.state.newTaskName,
                        'completed': false,
                        'dueDate': null,
                        'note': null,
                        'priority': 0,
                        'createdTimeStamp': Date.now(),
                        'timeStamp': Date.now(),
                        'completedTimeStamp': null,
                        'listName' : this.props.listSelected,
                        'authorID' : this.props.authUser.uid
                    }

                    this.props.firebase.db.collection('tasks')
                        .add(newTask);
                    event.preventDefault();
                }
            }
        }
    }

    handleCreateNewTaskSubmit = () => {
        if (this.state.newTaskName !== undefined) {
            if (this.state.newTaskName !== '') {
                this.setState({ newTaskName: '' });

                let newTask = {
                    'name': this.state.newTaskName,
                    'completed': false,
                    'dueDate': null,
                    'note': null,
                    'priority': 0,
                    'createdTimeStamp': Date.now(),
                    'timeStamp': Date.now(),
                    'completedTimeStamp': null,
                    'authorID' : this.props.authUser.uid
                }

                this.props.firebase.db.collection('tasks')
                    .add(newTask);
            }
        }
    }

    handleListSelect = (option) => {
        this.props.onUpdateSelectedList(option.label);
        this.handleTaskListener(this.props.reduxUser.hideCompleted, option.label);
    }

    handleDeleteTask = (taskId) => {
        this.props.firebase.db.collection('tasks').doc(taskId)
            .delete()
    }

    handleTaskListener = (hideCompleted, selectedList) => {
        if (selectedList === 'All Tasks') {
            if (hideCompleted) {
                this.taskListener = this.props.firebase.db.collection('tasks')
                    .where('authorID', '==', this.props.authUser.uid)
                    .where('completed', '==', false)
                    .orderBy('timeStamp', 'desc')
                    .onSnapshot(querySnapshot => {
                        let newTasks = [];

                        querySnapshot.forEach((doc) => {
                            let newTask = doc.data();
                            newTask.id = doc.id;
                            newTasks.push(newTask);
                        });
                        this.props.onUpdateTasks(newTasks);
                    });
            }else {
                this.taskListener = this.props.firebase.db.collection('tasks')
                    .where('authorID', '==', this.props.authUser.uid)
                    .orderBy('timeStamp', 'desc')
                    .onSnapshot(querySnapshot => {
                        let newTasks = [];

                        querySnapshot.forEach((doc) => {
                            let newTask = doc.data();
                            newTask.id = doc.id;
                            newTasks.push(newTask);
                        });

                        this.props.onUpdateTasks(newTasks);
                    });
            }
        }else {
            if (hideCompleted) {
                this.taskListener = this.props.firebase.db.collection('tasks')
                    .where('authorID', '==', this.props.authUser.uid)
                    .where('listName', '==', selectedList)
                    .where('completed', '==', false)
                    .orderBy('timeStamp', 'desc')
                    .onSnapshot(querySnapshot => {
                        let newTasks = [];

                        querySnapshot.forEach((doc) => {
                            let newTask = doc.data();
                            newTask.id = doc.id;
                            newTasks.push(newTask);
                        });

                        this.props.onUpdateTasks(newTasks);
                    });
            }else {
                this.taskListener = this.props.firebase.db.collection('tasks')
                    .where('authorID', '==', this.props.authUser.uid)
                    .where('listName', '==', selectedList)
                    .orderBy('timeStamp', 'desc')
                    .onSnapshot(querySnapshot => {
                        let newTasks = [];

                        querySnapshot.forEach((doc) => {
                            let newTask = doc.data();
                            newTask.id = doc.id;
                            newTasks.push(newTask);
                        });

                        this.props.onUpdateTasks(newTasks);
                    });
            }
        }
    }


    componentDidMount() {
        if (this.props.authUser !== null) {

            this.listListener = this.props.firebase.db.collection('lists')
                .orderBy('createdTimeStamp', 'desc')
                .where('authorID', '==', this.props.authUser.uid)
                .onSnapshot(querySnapshot => {
                    let newLists = ["All Tasks"];

                    querySnapshot.forEach((doc) => {
                        let newList = doc.data();
                        newLists.push(newList.name);
                    });

                    this.props.onUpdateLists(newLists);
            });

            this.userListener = this.props.firebase.db.collection('users').doc(this.props.authUser.uid)
                .onSnapshot(doc => {
                    if (doc.exists) {
                        let userData = doc.data();
                        userData.id = doc.id;

                        this.props.onUpdateUser(userData);
                    }
            });

        }
    }


    handleToggleTask = (taskId) => {
        let taskRef = this.props.firebase.db.collection('tasks').doc(taskId);

        this.props.firebase.db.runTransaction(transaction => {
            return transaction.get(taskRef).then(taskDoc => {
                if (taskDoc.exists) {
                    let newCompletion = !taskDoc.data().completed;
                    transaction.update(taskRef, {completed: newCompletion, timeStamp: Date.now()});
                }
            });
        }).then(() => {
            console.log('Success switching completed!');
        }).catch(err => {
            console.log(err);
        });
    }

    handleHideCompleted = () => {
        if (this.props.authUser !== null) {
            let userRef = this.props.firebase.db.collection('users').doc(this.props.authUser.uid);

            this.props.firebase.db.runTransaction(transaction => {
                return transaction.get(userRef).then(userDoc => {
                    if (userDoc.exists) {
                        let oldHideCompleted = userDoc.data().hideCompleted || false;
                        transaction.update(userRef, { hideCompleted: !oldHideCompleted});
                    }
                });
            }).then(() => {
                this.handleTaskListener(!this.props.reduxUser.hideCompleted, this.props.listSelected);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    componentWillUnmount() {
        if (this.taskListener !== null) {
            this.taskListener()
        }
        if (this.userListener !== null) {
            this.userListener()
        }

        if (this.listListener !== null) {
            this.listListener()
        }
    }
    

    render() {

        let hideCompleted = false;
        if (this.props.reduxUser !== null) {
            if (this.props.reduxUser.hideCompleted !== null) {
                hideCompleted = this.props.reduxUser.hideCompleted;
            }
        }

        if (this.props.reduxUser.hideCompleted !== undefined &&
            this.props.reduxLists !== undefined &&
            this.state.notLoaded) {

            this.handleTaskListener((this.props.reduxUser.hideCompleted), this.props.listSelected);
            this.setState({notLoaded: false});
        }


        return (
            <div className={classes.TaskScreen}>
                <AuthUserContext.Consumer>
                    {authUser =>
                        <Fragment>
                            <TaskOptions 
                                options={this.props.reduxLists} 
                                optionsValue={this.props.listSelected} 
                                hideCompleted={hideCompleted}
                                handleHideCompleted={this.handleHideCompleted}
                                onSelect={option => this.handleListSelect(option)}
                            />
                            <TaskItems
                                tasks={this.props.reduxTasks}
                                newTaskChanged={event => this.handleCreateNewTaskChange(event)}
                                newTaskSubmit={this.handleCreateNewTaskSubmit}
                                newTaskName={this.state.newTaskName}
                                newTaskKeyPressed={event => this.handleCreateNewTaskKeyPress(event)}
                                deleteTask={taskId => this.handleDeleteTask(taskId)}
                                toggleTask={taskId => this.handleToggleTask(taskId)}
                            />
                        </Fragment>
                    }
                </AuthUserContext.Consumer>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxTasks: state.tasks,
        reduxLists: state.lists,
        reduxAuthUser: state.authUser,
        reduxUser: state.user,
        listSelected: state.listSelected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: (user) => dispatch({type: actionTypes.UPDATE_USER_DOC, payload: {user: user}}),
        onUpdateTasks: (tasks) => dispatch({type: actionTypes.UPDATE_TASKS, payload: {tasks: tasks}}),
        onUpdateLists: (lists) => dispatch({type: actionTypes.UPDATE_LISTS, payload: {lists: lists}}),
        onUpdateSelectedList: (listSelected) => dispatch({type: actionTypes.UPDATE_SELECTED_LIST, payload: {listSelected: listSelected}})
    };
};

const condition = authUser => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(condition)(TaskScreen));
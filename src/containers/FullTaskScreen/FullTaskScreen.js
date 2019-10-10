import React, { Component, Fragment } from 'react';
import FullTask from '../../components/Tasks/FullTask/FullTask';
import classes from './FullTaskScreen.module.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actionTypes from '../../constants/reduxActions';
import { withAuthorization } from '../../components/Session';

class FullTaskScreen extends Component {

    state = {
        task: {},
        error: null,
        taskDeleted: false
    }


    taskListener = this.props.firebase.db.collection('tasks').doc(this.props.match.params.id)
        .onSnapshot(doc => {
            if (doc.exists) {
                let newTask = doc.data();
                newTask.id = doc.id;
                this.setState({ task: newTask });
            }
        });

    handleTaskNameChange(event) {
        let newTask = {...this.state.task};
        newTask.name = event.target.value;
        this.setState({ task : newTask});
    }

    handleNoteChange(event) {
        let newTask = {...this.state.task};
        newTask.note = event.target.value;
        this.setState({ task : newTask});
    }

    handleNoteSubmit(event) {
        let newTask = {...this.state.task};
        newTask.note = event.target.value;
        this.setState({ task : newTask});

        let taskRef = this.props.firebase.db.collection('tasks').doc(this.state.task.id);
        taskRef.update({note: event.target.value});
    }

    handleTaskDeleted = () => {
        let taskRef = this.props.firebase.db.collection('tasks').doc(this.state.task.id);
        taskRef.delete().then(() => {
            this.setState({taskDeleted: true});
        });
    }

    handleDateChange(date) {
        let newTask = {...this.state.task};
        newTask.dueDate = date;
        this.setState({ task : newTask});

        let taskRef = this.props.firebase.db.collection('tasks').doc(this.state.task.id);

        if (date === null) {
            taskRef.update({dueDate: null, timeStamp: Date.now()});
        }else {
            taskRef.update({dueDate: date.getTime(), timeStamp: Date.now()});
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

    handleTaskNameSubmit = (event) => {
        let taskRef = this.props.firebase.db.collection('tasks').doc(this.state.task.id);

        this.props.firebase.db.runTransaction(transaction => {
            return transaction.get(taskRef).then(taskDoc => {
                if (taskDoc.exists) {
                    let oldName = taskDoc.data().name;
                    console.log(oldName);
                    if (oldName !== this.state.task.name) {
                        transaction.update(taskRef, {name: this.state.task.name, timeStamp: Date.now()});
                    }
                }
            });
        }).then(() => {
            console.log('Success switching completed!');
        }).catch(err => {
            console.log(err);
        });

    }

    componentDidMount() {
        this.props.firebase.db.collection('tasks')
            .doc(this.props.match.params.id)
            .get()
            .then(doc => {
                let newTask = doc.data();
                newTask.id = doc.id;
                this.setState({ task: newTask });
            }).catch(err => {
                this.setState({error: err});
            });
    }

    componentWillUnmount() {
        this.taskListener()
    }

    goBack = () => {
        this.props.history.goBack();
    }

    onListSelect = (option) => {
        if (this.state.task !== null) {

        }
        let taskRef = this.props.firebase.db.collection('tasks').doc(this.state.task.id);

        this.props.firebase.db.runTransaction(transaction => {
            return transaction.get(taskRef).then(taskDoc => {
                if (taskDoc.exists) {
                    transaction.update(taskRef, {listName: option.label, timeStamp: Date.now()});
                }
            });
        }).then(() => {
            console.log('Success switching completed!');
        }).catch(err => {
            console.log(err);
        });
    }


    render() {

        if (this.state.error !== null || this.state.taskDeleted) {
            return <Redirect to='/tasks' />
        }

        return (
            <div
                className={classes.FullTaskScreen}>
                <FullTask
                    task={this.state.task}
                    options={this.props.reduxLists} 
                    optionsValue={this.state.task.listName} 
                    onSelect={option => this.onListSelect(option)}
                    taskNameChanged={event => this.handleTaskNameChange(event)}
                    taskNameSubmit={event => this.handleTaskNameSubmit(event)}
                    noteChanged={event => this.handleNoteChange(event)}
                    noteSubmit={event => this.handleNoteSubmit(event)}
                    dateChanged={date => this.handleDateChange(date)}
                    toggleTask={task => this.handleToggleTask(task)}
                    deleteTask={this.handleTaskDeleted}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxTasks: state.tasks,
        reduxLists: state.lists,
        reduxAuthUser: state.authUser,
        reduxUser: state.user
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

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(condition)(FullTaskScreen));
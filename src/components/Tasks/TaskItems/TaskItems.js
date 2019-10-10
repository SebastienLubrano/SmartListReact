import React from 'react';
import classes from './TaskItems.module.css';
import CreateTaskItem from '../CreateTaskItem/CreateTaskItem';
import TaskItem from '../TaskItem/TaskItem';

const taskItems = (props) => {

    let tasks = props.tasks.map((task, index) => {
        return (
            <TaskItem
                task={task}
                key={task.id}
                deleteTask={taskId => props.deleteTask(taskId)}
                toggleTask={taskId => props.toggleTask(taskId)}
            />
        );
    });

    return (
        <div className={classes.TaskItems}>
            <CreateTaskItem 
                newTaskChanged={event => props.newTaskChanged(event)}
                newTaskSubmit={event => props.newTaskSubmit(event)}
                newTaskKeyPressed={event => props.newTaskKeyPressed(event)}
                newTaskName={props.newTaskName}
            />
            {tasks}
        </div>
    );
}

export default taskItems;
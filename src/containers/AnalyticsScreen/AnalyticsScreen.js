import React, { Component } from 'react';
import classes from './AnalyticsScreen.module.css';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryAnimation, VictoryLabel, VictoryContainer } from 'victory';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionTypes from '../../constants/reduxActions';
import { withAuthorization } from '../../components/Session';
import { isMobile } from 'react-device-detect';


class AnalyticsScreen extends Component {

    state = {
        tasks: [],
        tasksOverTime: [],
        percent: 0,
        notLoaded: true
    }

    taskListener = null;

    componentDidMount() {

        // if (this.props.tasks.length !== 0) {
        //     console.log(this.props.tasks);
        //     let completedPercent = this.getPercent(this.groupBy(this.props.tasks, task => task.completed));

        //     this.setState({
        //         tasksOverTime: this.graphSort(this.groupBy(this.props.tasks, task => moment.unix(task.createdTimeStamp / 1000).format("M/DD"))),
        //         percent: completedPercent,
        //         tasksCompletedData: this.getCompletedData(completedPercent),
        //         totalCompletedData: this.getTotalData(completedPercent, this.getCompletedData)
        //     });
        // }

        if (this.props.authUser !== null) {
            this.taskListener = this.props.firebase.db.collection('tasks')
                .orderBy('timeStamp', 'desc')
                .where('authorID', '==', this.props.authUser.uid)
                .onSnapshot(querySnapshot => {
                    let newTasks = [];

                    querySnapshot.forEach((doc) => {
                        let newTask = doc.data();
                        newTask.id = doc.id;
                        newTasks.push(newTask);
                    });

                    this.props.onUpdateTasks(newTasks);
                    let completedPercent = this.getPercent(this.groupBy(this.props.reduxTasks, task => task.completed));

                    this.setState({
                        tasksOverTime: this.graphSort(this.groupBy(this.props.reduxTasks, task => moment.unix(task.createdTimeStamp / 1000).format("M/DD"))),
                        percent: completedPercent,
                        tasksCompletedData: this.getCompletedData(completedPercent),
                        totalCompletedData: this.getTotalData(completedPercent, this.getCompletedData),
                        notLoaded: false
                    });

                });
        }
    }

    getCompletedData(percent) {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }

    getTotalData(percent, completeFunc) {
        return {percent: percent, data: completeFunc(percent)};
    }

    componentWillUnmount() {
        if (this.taskListener !== null) {
            this.taskListener()
        }
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    }

    graphSort(map) {
        let arr = [];
        map.forEach(function (val, key) {
            arr.push({ date: key, value: val.length });
        });
        arr.sort(this.compare);
        return arr;
    }

    getPercent(map) {
        let arr = [];
        map.forEach(function (val, key) {
            arr.push({ type: key, value: val.length });
        });

        let trueLength, falseLength = 1;
        if (map.get(true) !== undefined) {
            trueLength = map.get(true).length;
        }
        if (map.get(false) !== undefined) {
            falseLength = map.get(false).length;
        }

        return (trueLength / (trueLength + falseLength)) * 100;
    }

    compare( a, b ) {
        if ( a.date < b.date ){
          return -1;
        }
        if ( a.date > b.date ){
          return 1;
        }
        return 0;
      }


    render() {

        let labelFontSize = 21;

        if (isMobile) {
            labelFontSize = 14;
        }

        let tasksCompletedFontSize = 35;

        if (isMobile) {
            tasksCompletedFontSize = 25;
        }

        return (
            <div className={classes.AnalyticsScreen}>
                <div className={classes.Box}>
                    <p>Tasks Created</p>
                    <VictoryChart
                        domainPadding={{ x: 50 }}
                        width={isMobile ? 300 : 400} 
                        height={isMobile ? 200 : 310}
                        containerComponent={<VictoryContainer responsive={isMobile}/>}
                    >
                        <VictoryBar
                            data={this.state.tasksOverTime}
                            x='date'
                            y='value'
                            style={{
                                data: {
                                    'fill': '#FF7E67',
                                    'stroke': '#000000',
                                    'strokeWidth': '1'
                                }
                            }}
                        />
                        <VictoryAxis
                            label="Date"
                            style={{
                                axisLabel: { padding: 30, fontSize: {labelFontSize} },
                                fontSize: {labelFontSize},
                                tickLabels: {fontSize: 11, padding: 5}
                            }}
                        />
                        <VictoryAxis dependentAxis
                            label="Amount"
                            style={{
                                axisLabel: { padding: 35, fontSize: {labelFontSize} },
                                fontSize: {labelFontSize}
                            }}
                        />
                    </VictoryChart>

                </div>
                <div className={classes.TasksCompletedBox}>
                    <svg viewBox="0 0 400 400" width="100%" height="100%">
                        <VictoryPie
                            standalone={false}
                            animate={{ duration: 1000 }}
                            data={this.state.tasksCompletedData}
                            innerRadius={120}
                            cornerRadius={25}
                            labels={() => null}
                            style={{
                                data: {
                                    fill: ({ datum }) => {
                                        const color = '#FF7E67';
                                        return datum._x === 1 ? color : "transparent";
                                    }
                                }
                            }}
                        />
                        <VictoryAnimation duration={1000} data={this.state.totalCompletedData}>
                            {(newProps) => {
                                return (
                                    <VictoryLabel
                                        textAnchor="middle" verticalAnchor="middle"
                                        x={200} y={200}
                                        text={`Tasks \n Completed \n ${Math.round(newProps.percent)}%`}
                                        style={{ fontSize: tasksCompletedFontSize ,fill: '#07689F'}}
                                    />
                                );
                            }}
                        </VictoryAnimation>
                    </svg>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxTasks: state.tasks,
        reduxUser: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateTasks: (tasks) => dispatch({type: actionTypes.UPDATE_TASKS, payload: {tasks: tasks}})
    };
};

const condition = authUser => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(condition)(AnalyticsScreen));
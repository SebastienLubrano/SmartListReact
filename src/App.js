import React from 'react';
import Layout from './components/Layout/Layout';
import TaskScreen from './containers/TaskScreen/TaskScreen';
import ListScreen from './containers/ListScreen/ListScreen';
import { FirebaseContext } from './Firebase';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AnalyticsScreen from './containers/AnalyticsScreen/AnalyticsScreen';
import FullTaskScreen from './containers/FullTaskScreen/FullTaskScreen';
import LandingScreen from './containers/LandingScreen/LandingScreen';
import LoginScreen from './containers/LoginScreen/LoginScreen';
import SettingsScreen from './containers/SettingsScreen/SettingsScreen';
import SignUpScreen from './containers/SignUpScreen/SignUpScreen';
import { withAuthentication, AuthUserContext } from './components/Session';
import classes from './App.module.css';

function App() {

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Layout />
        <FirebaseContext.Consumer>
          {firebase => {
            return (
              <AuthUserContext.Consumer>
                {authUser =>
                  <Switch>
                    <Route path="/" exact component={(props) => 
                      <LandingScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                    />
                    <Route path="/login" exact component={(props) => 
                      <LoginScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                    />
                    <Route path="/signup" exact component={(props) => 
                      <SignUpScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                    />
                    <Route path="/tasks" exact component={(props) => 
                      <TaskScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                    />
                    <Route path="/tasks/:id" exact component={(props) => 
                      <FullTaskScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                    />
                    <Route path="/lists" exact component={(props) => 
                      <ListScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                    />
                    <Route path="/analytics" exact component={(props) => 
                      <AnalyticsScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                    />
                    <Route path="/settings" exact component={(props) => 
                      <SettingsScreen {...props} 
                        firebase={firebase} 
                        authUser={authUser}
                      />} 
                  />
                  </Switch>
                }
              </AuthUserContext.Consumer>
            );
          }}
        </FirebaseContext.Consumer>
      </BrowserRouter>
    </div>
  );
}

export default withAuthentication(App);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './Firebase';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();

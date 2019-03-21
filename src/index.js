import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './store/reducers/user';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const startApp = () => {
    const rootReducer = combineReducers({
        user: userReducer
    });
    const store = createStore(rootReducer, applyMiddleware(thunk));

    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
};
  
startApp();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

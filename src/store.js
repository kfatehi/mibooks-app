import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
const reducer = combineReducers(reducers);
const store = createStore(reducer);
module.exports = store;

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import remoteActionMiddleware from './remote-action-middleware';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware()
)(createStore);

const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
module.exports = store;

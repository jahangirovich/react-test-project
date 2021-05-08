import {createStore, combineReducers} from 'redux'
import {taskListReducer } from '../reducers/tasksList'

const reducers = combineReducers({ taskListReducer })

export default createStore(reducers);
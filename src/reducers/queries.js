import {ActionTypes} from '../constants'

const defaultState = {
    queries: {"sort_direction":"asc","sort_field":"id"}
}

export default function queriesReducer(state = defaultState, action){
    switch(action.type){
        case ActionTypes.SET_TASKS:
            return {...state, tasks: action.payload}
        default:
            return state
    }
}
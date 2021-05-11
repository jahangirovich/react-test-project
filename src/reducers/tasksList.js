import {ActionTypes} from '../constants'

const defaultState = {
    tasks:      [],
    queries:    {"sort_direction":"ASC","sort_field":"username"},
    modal:      0,
    auth_modal: 0,
    isAdmin:    false,
    detail_task:{},
    open_detail: 0,
}

export function taskListReducer(state = defaultState, action){
    switch(action.type){
        case ActionTypes.SET_TASKS:
            return {...state, tasks: action.payload}
        case ActionTypes.SET_QUERIES:
            return {...state, queries: action.payload}
        case ActionTypes.SET_MODAL:
            return {...state, modal: action.payload}
        case ActionTypes.SET_AUTH_MODAL:
            return {...state, auth_modal: action.payload}
        case ActionTypes.SET_ADMIN:
            return {...state, isAdmin: action.payload}
        case ActionTypes.SET_DETAIL:
            return {...state, detail_task: action.payload}
        case ActionTypes.OPEN_DETAIL:
            return {...state, open_detail: action.payload}
        default:
            return state
    }
}

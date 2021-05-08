import {ActionTypes} from '../constants'

export const setTasks = (tasks) => ({
    type: ActionTypes.SET_TASKS,
    payload: tasks
})

export const setQueries = (queries) => ({
    type: ActionTypes.SET_QUERIES,
    payload: queries
})

export const setDetailTask = (detail_task) =>({
    type: ActionTypes.SET_DETAIL,
    payload: detail_task
})

export const openDetail = (open) =>({
    type: ActionTypes.OPEN_DETAIL,
    payload: open
})

export const setAdmin = (isAdmin) => ({
    type: ActionTypes.SET_ADMIN,
    payload: isAdmin
})

export const setModal = (modal) => ({
    type: ActionTypes.SET_MODAL,
    payload: modal
})

export const setAuthModal = (authModal) => ({
    type: ActionTypes.SET_AUTH_MODAL,
    payload: authModal
})
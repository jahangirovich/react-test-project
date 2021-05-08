import axios from 'axios'
import qs from 'qs'

const API_URL = 'https://cors-anywhere.herokuapp.com/https://test-project-laravel-react.herokuapp.com/api/';

export const getTasks = (callback, page, query) =>{
    axios
    .get(API_URL + `?developer=Zhahangir&page=${page}&sort_direction=${query['sort_direction']}&sort_field=${query['sort_field']}`)
    .then((res)=>{
        callback(res.data.message)
    })
    .catch((err) =>{
        callback(err)
    })
}

export const postRequest = (url,form, callback, error_callback) => {
    axios.post( API_URL + url,form,{ "Content-Type": "multipart/form-data" })
    .then((res)=>{
        callback(res)
    })
    .catch((err)=>{
        error_callback(err.response)
    })
}

export const putRequest = (url,form, callback, error_callback) => {
    axios.post( API_URL + url,form,{ headers: { "Authorization": `Bearer ${window.localStorage.getItem("user")}` } })
    .then((res)=>{
        callback(res)
    })
    .catch((err)=>{
        error_callback(err.response)
    })
}


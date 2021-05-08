import {Modal} from '../styledComponents/index'
import { useDispatch, useSelector } from 'react-redux';
import {ActionTypes} from '../constants'
import {postRequest} from '../api'
import {useState} from 'react' 

export default function SplashModal(){
    const isOpen            = useSelector((state) => state.taskListReducer.auth_modal);
    const setDispatcher     = useDispatch();
    const[err, setErr]      = useState("")
    const [form, setForms]  = useState({
        username    : "",
        password       : "",
    })

    function closeModal(e, height){
        if(e.target != e.currentTarget) return;
        setDispatcher({
            type: ActionTypes.SET_AUTH_MODAL,
            payload: height
        })
    }

    function onAddTask(e){
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("email",form["username"]);
        bodyFormData.append("password",form["password"]);

        postRequest("login",bodyFormData,
            function(res){
                setDispatcher({
                    type: ActionTypes.SET_AUTH_MODAL,
                    payload: 0
                })
                setDispatcher({
                    type: ActionTypes.SET_ADMIN,
                    payload: true
                })
                localStorage.setItem("user", res.data.message)
            },function(res){
                setErr(res.data.message)
            })
    }

    function handleChange(e, val){
        if(val == "username")
            setForms({
                ...form,
                username: e.target.value
            })

        else
            setForms({
                ...form,
                password: e.target.value
            })
    }

    return (
        <Modal height={isOpen} onClick={(e) => closeModal(e,0)}>
            <div>
                <form onSubmit={(e) => onAddTask(e)}>
                    <p>
                        <label htmlFor="username">Username:</label>
                        <input type="text"  id="username" onChange={(e) => handleChange(e,"username")} />
                    </p>
                    <p>
                        <label htmlFor="email">Password:</label>
                        <input type="password"  id="password" onChange={(e) => handleChange(e,"password")}/>
                    </p>
                    <p className="errors">
                        {
                            err
                        }
                    </p>
                    <input type="submit" />
                </form>
            </div>
        </Modal>
    )
}
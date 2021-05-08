import {Modal} from '../styledComponents/index'
import { useDispatch, useSelector } from 'react-redux';
import {ActionTypes} from '../constants'
import {postRequest} from '../api'
import {useState} from 'react' 

export default function SplashModal(){
    const isOpen   = useSelector((state) => state.taskListReducer.modal);
    const setDispatcher     = useDispatch();
    const[err, setErr]      = useState("")
    const [form, setForms] = useState({
        username    : "",
        email       : "",
        text        : ""
    })

    function closeModal(e, height){
        if(e.target != e.currentTarget) return;
        setDispatcher({
            type: ActionTypes.SET_MODAL,
            payload: height
        })
    }

    function onAddTask(e){
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("username",form["username"]);
        bodyFormData.append("email",form["email"]);
        bodyFormData.append("text",form["text"]);

        postRequest("create",bodyFormData,
            function(res){
                setDispatcher({
                    type: ActionTypes.SET_MODAL,
                    payload: 0
                })
            },function(res){
                let st = ""
                let obj = Object.keys(res.data.message)
                obj.forEach((e)=>{
                    st += e + " "  + res.data.message[e]
                })
                setErr(st)
            })
    }

    function handleChange(e, val){
        if(val == "username")
            setForms({
                ...form,
                username: e.target.value
            })
        else if(val == "email")
            setForms({
                ...form,
                email: e.target.value
            })
        else
            setForms({
                ...form,
                text: e.target.value
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
                        <label htmlFor="email">Email:</label>
                        <input type="text"  id="email" onChange={(e) => handleChange(e,"email")}/>
                    </p>
                    <p>
                        <label htmlFor="text">Text:</label>
                        <input type="text"  id="text" onChange={(e) => handleChange(e,"text")}/>
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
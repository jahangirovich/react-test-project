import {Modal,Card} from '../styledComponents/index'
import { useDispatch, useSelector } from 'react-redux';
import {ActionTypes} from '../constants'
import {putRequest} from '../api'
import {useState,useEffect} from 'react' 

export default function EditModel(){
    const isOpen    = useSelector((state) => state.taskListReducer.open_detail);
    const detail    = useSelector((state) => state.taskListReducer.detail_task);

    const [options, setOptions]   = useState([
        {val: "не выполнено", code: 0}, 
        {val: "задача не выполнена, отредактирована админом",code: 1},
        {val: "задача выполнена", code: 10},
        {val: "задача отредактирована админом и выполнена", code: 11}])
    const setDispatcher     = useDispatch();
    const[err, setErr]      = useState("")
    const [form, setForms] = useState({
        text        : detail.text,
        status      : detail.status
    })

    useEffect(() => {
        setForms(detail)
        setOptions(options.map((e)=>{
            if(e.code == detail.status){
                return {
                    ...e,
                    current: true
                }
            }
            return {
                ...e,
                current: false
            }
        }))
    }, [detail])

    function closeModal(e, height){
        if(e.target != e.currentTarget) return;
        setDispatcher({
            type: ActionTypes.OPEN_DETAIL,
            payload: height
        })
    }

    function onAddTask(e){
        e.preventDefault();
        var bodyFormData = new FormData();
        let getOption = getCurrentOption();
        console.log(getOption)
        bodyFormData.append("text",form["text"]);
        bodyFormData.append("status", getOption)

        putRequest("edit/"+detail.id,bodyFormData,
            function(res){
                setDispatcher({
                    type: ActionTypes.OPEN_DETAIL,
                    payload: 0
                })

            },function(res){
                setErr(res)
            })
    }

    function getCurrentOption(){
        let cur = 0
        options.forEach((e,index) => {
            if(e.current) cur =  e.code;
        })
        return cur
    }

    function handleChange(e, val){
        
        setForms({
            ...form,
            text: e.target.value
        })
    }

    function optionsClick(event , i){
        setOptions(options.map((e,index)=>{
            if(index == i){
                return {
                    ...e,
                    current: true
                }
            }
            return {
                ...e,
                current: false
            }
        }))
    }

    return (
        <Modal height={isOpen} onClick={(e) => closeModal(e,0)}>
            <div>
                <form onSubmit={(e) => onAddTask(e)}>
                   
                    <p>
                        <label htmlFor="text">Text:</label>
                        <input type="text"  id="text" value={form.text} onChange={(e) => handleChange(e,"text")}/>
                    </p>
                    <p className="options">
                        <label htmlFor="men">Status:</label>
                        {
                            options.map((e,i) => {
                                return (
                                    <span onClick={() => optionsClick(e,i)} key={i} background={e.code} className={e.current ? "selected" : ""}>{e.val}</span>
                                )
                            })
                        }
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
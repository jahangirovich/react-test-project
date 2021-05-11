import {
    Button,
    Card,
    Body,
    MainBody,
    Header,
    Category} from '../styledComponents/index'
import SplashModal from '../components/Modal'
import AuthModal from '../components/AuthModal'
import EditModel from '../components/EditModal'
import {useEffect,useState} from 'react'
import {getTasks} from '../api'
import {useHistory} from 'react-router-dom'
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {ActionTypes} from '../constants'


function Tasks(props) {
    
    const{
        id
    } = props.match.params
    var history             = useHistory();

    const setDispatcher     = useDispatch();
    const tasks             = useSelector((state) => state.taskListReducer.tasks);
    const isAdmin           = useSelector((state) => state.taskListReducer.isAdmin);
    const queries           = useSelector((state) => state.taskListReducer.queries);
    const editOpen          = useSelector((state) => state.taskListReducer.open_detail);
    const isOpen            = useSelector((state) => state.taskListReducer.modal);

    const[query, setQuery]  = useState([{val : "username" , current: true},{val : "email", current: false},{val : "status", current: false}])
    const[sortBy, setSortBy]   = useState([{val: "DESC", current: true}, {val: "ASC", current: false}])

    const[total, setTotal] = useState(1)
    const[currentPage, setCurrentPage] = useState(parseInt(id))

    const onPageChanged = (currentPage)=>{
        if(currentPage.currentPage == undefined){
            history.push(`/page/${currentPage}`)
            return;
        }
        history.push(`/page/${currentPage.currentPage}`)
        setCurrentPage(currentPage.currentPage)
    }  

    useEffect(()=>{
        if(localStorage.getItem("user") != undefined) 
            setDispatcher({
                type: ActionTypes.SET_ADMIN,
                payload: true
            })
    },[isAdmin])

    useEffect(()=>{
        getTasks(function(res){
            setTotal(res.total_task_count)
            setDispatcher({
                type: ActionTypes.SET_TASKS,
                payload: res
            })
        },currentPage, queries)
    },[currentPage,queries,editOpen,isOpen])

    useEffect(() => {
        setQuery(query.map((e)=>callFilterFunc(e,queries,"sort_field")))

        setSortBy(sortBy.map((e)=> callFilterFunc(e,queries,"sort_direction")))

    }, [queries])

    const callFilterFunc = (e,queries,key) => {
        if(e.val == queries[key]){
            return {
                val: e.val,
                current: true
            }
        }
        return {
            val: e.val,
            current: false
        }
    }

    function querySelect(e){
        setDispatcher({
            type: ActionTypes.SET_QUERIES,
            payload: {
                "sort_field": query[e].val,
                "sort_direction": queries["sort_direction"]
            }
        })
    }

    function sortSelect(e){
        setDispatcher({
            type: ActionTypes.SET_QUERIES,
            payload: {
                "sort_field": queries["sort_field"],
                "sort_direction": sortBy[e].val
            }
        })
    }

    function openModal(e){
        setDispatcher({
            type: ActionTypes.SET_MODAL,
            payload: e
        })
    }

    function openAuthModal(e){
        setDispatcher({
            type: ActionTypes.SET_AUTH_MODAL,
            payload: e
        })
    }

    function onCardClick(e){
        if(localStorage.getItem("user") == undefined) return;

        setDispatcher({
            type:ActionTypes.SET_DETAIL,
            payload: e
        })

        setDispatcher({
            type: ActionTypes.OPEN_DETAIL,
            payload: 100
        })
    }

    return (
        <MainBody>
            <Header>
                <Button backgroundColor onClick={() => { openModal(100) }}>
                    Создать задачу
                </Button>
                <Button onClick={() => openAuthModal(100)}>
                    <span>Войти как админ</span> 
                    <i className="fa fa-server"></i>
                </Button>
            </Header>
            <Body>
                <Category>
                    <div>
                        {
                            query.map((e, i)=>{
                                return(
                                    <span key={i} className={e.current ? "current" : ""} onClick={() => querySelect(i)}>{e.val}</span>
                                )
                            })
                        }
                    </div>
                    <div className="byOrder">
                        {
                            sortBy.map((e,i) =>{
                                return(
                                    <span key={i} className={e.current ? "current" : ""} onClick={() => sortSelect(i)}>{e.val}</span>
                                )
                            })
                        }
                    </div>
                </Category>
                {
                    tasks.tasks ? tasks.tasks.map((e,i) => {
                        return (
                            <div key={e.id}>
                                
                                <Card background={e.status} isAdmin={isAdmin} onClick={() => onCardClick(e)}>
                                    <span className="author-name">
                                        {e.username}
                                    </span>
                                    <h3>
                                        {e.text}
                                    </h3>
                                    <span className="author-email">
                                        {e.email}
                                    </span>
                                    <span className={isAdmin ? "editIcon" : "disabled editIcon"}>
                                        <i className="fa fa-edit"></i>
                                    </span>
                                </Card>
                            </div>
                        )
                    }) : null
                }
            </Body>
            <SplashModal/>
            <AuthModal/>
            <EditModel/>
            {
                tasks.tasks ? <Pagination
                    totalRecords={tasks.total_task_count}
                    pageLimit={3}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                    currentPage={parseInt(id)}
                />  : null
            }
        </MainBody>
    );
}


export default Tasks;
  
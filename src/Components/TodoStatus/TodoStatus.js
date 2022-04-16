import { useContext, useState } from "react"
import todoContext from "../../todo/todo-context"
import DisplayStatus from "./DisplayStatus";

function TodoStatus(props) {
    const tdContext = useContext(todoContext);
    const Status=['All','Active','Completed'];
    const [active,setActive]=useState({activeIndex:'All'})

    const clearCompletedTodo = (e) => {
        e.preventDefault()
        tdContext.clearCompletedTodo()

    }
    const handleStatus=(status)=>{
        props.setStatus(status)
        setActive({activeIndex:status})
    }
    return (
        <div id="stats" class={`card stats-container ${tdContext.theme==='whiteTheme'?'stats-container-light':'stats-container-dark'}`}>
            <div class="card-body stats-body">
                <p class="left-items">{tdContext.remainingTodo} Items Left </p>
                <div class={`stats ${tdContext.theme ==='whiteTheme'?'stats-light':'stats-dark'}`}>
                    {Status.map((status,i)=>(
                        <DisplayStatus className={status===active.activeIndex?'active':'unactive'} sendStatus={handleStatus} key={i} all={tdContext.allTodo} active={tdContext.activeTodo} completed={tdContext.completedTodo} status={status}/>
                    ))}
                    
                </div>
                <a href="http" onClick={clearCompletedTodo} className='clear m-0' >Clear completed</a>
            </div>
        </div>
    )
}

export default TodoStatus
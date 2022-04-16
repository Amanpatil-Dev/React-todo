import Input from "../UI/Input"
import { useContext, useRef } from "react"
import todoContext from "../../todo/todo-context";

function TodoInput(props) {
   const tdContext= useContext(todoContext)
    const todoInput=useRef();

    const getTodo=()=>{
        if(todoInput.current.value === '') return 
        
        tdContext.addTodo({
            id:Math.random().toString(36).slice(2),
            todo: todoInput.current.value,
            isCompleted:false,
            
        })

        todoInput.current.value=''

    }

    return (
        <div class="input-group my-4">
            <div class={`input-group-text ${tdContext.theme==='whiteTheme'?'input-group-text-light':'input-group-text-dark'}`}>
                <input class={`form-check-input mt-0 ${tdContext.theme==='whiteTheme'?'form-check-input-light':'form-check-input-dark'}`} type="radio" value=""
                    aria-label="Radio button for following text input"></input>
            </div>
            <Input className={`form-control ${tdContext.theme==='whiteTheme'?'todo-input-light':'todo-input-dark'} `} onKeyUp={getTodo} ref={todoInput} input={{
                type:"text",
                placeholder:'Create a new todo'
            }}/>
        </div>
    )
}

export default TodoInput
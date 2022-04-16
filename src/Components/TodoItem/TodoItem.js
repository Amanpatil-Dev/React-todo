import { useContext } from "react"
import todoContext from "../../todo/todo-context"
function TodoItem(props) {
    const tdContext = useContext(todoContext)

    const checkHandler = (id) => {
        tdContext.markAsComplete(id)

    }
    const removeById = (id) => {
        tdContext.deleteById(id)

    }
    const editTodo = (id) => {
        props.getEditTodoId(id)
    }

    return (
        <div class={`card stats-container ${tdContext.theme==='whiteTheme'?'stats-container-light':'stats-container-dark'} ${props.status === 'Active' && props.isComplete === !false ? 'd-none' : ''} ${props.status === 'Completed' && props.isComplete === false ? 'd-none' : ''} `}>
            <div class={`card-body todo-body ${tdContext.theme==='whiteTheme'?'todo-body-light':'todo-body-dark'}`}>
                <input class={`form-check-input mt-0 checkbox ${tdContext.theme==='whiteTheme'?'form-check-input-light':'form-check-input-dark'}`} onChange={checkHandler.bind(null, props.id)} data-id={props.id} type="checkbox"
                    aria-label="Radio button for following text input"></input>
                <p className={`${props.isComplete ? 'isCompleted' : ''} todo-item`}>{props.todo[0].toUpperCase() + props.todo.substring(1)}</p>
            </div>

            {/* <button onClick={editTodo.bind(null,props.id)} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  edit
</button> */}
            <svg className="edit" onClick={editTodo.bind(null, props.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="64px" height="64px"><path fill="#444b54" d="M89 127H49c-1.7 0-3-1.3-3-3s1.3-3 3-3h40c1.7 0 3 1.3 3 3S90.7 127 89 127zM104 121A3 3 0 1 0 104 127 3 3 0 1 0 104 121z" /><g><path fill="#fff" d="M84.7,39.1l-37.3,64.4c-3.1,5.4-7.4,10-12.6,13.4L24,124l0.8-12.9c0.4-6.2,2.2-12.2,5.3-17.6l37.3-64.4" /><path fill="#fff" d="M60.4 44.1c-.5 0-1-.1-1.5-.4-1.4-.8-1.9-2.7-1.1-4.1l7-12c.8-1.4 2.7-1.9 4.1-1.1s1.9 2.7 1.1 4.1l-7 12C62.4 43.5 61.4 44.1 60.4 44.1zM77.7 54.1c-.5 0-1-.1-1.5-.4-1.4-.8-1.9-2.7-1.1-4.1l7-12c.8-1.4 2.7-1.9 4.1-1.1 1.4.8 1.9 2.7 1.1 4.1l-7 12C79.7 53.5 78.7 54.1 77.7 54.1z" /><path fill="#fcca3d" d="M47.2,94.8c-0.5,0-1-0.1-1.5-0.4c-1.4-0.8-1.9-2.7-1.1-4.1l25-43.4c0.8-1.4,2.6-1.8,4.1-1.1c5.6,2.7,5.6,2.7,5.6,2.7L49.9,93.4C49.3,94.4,48.2,94.8,47.2,94.8z" /><path fill="#444b54" d="M24,127c-0.5,0-1-0.1-1.5-0.4c-1-0.6-1.6-1.6-1.5-2.8l0.8-12.9c0.4-6.6,2.4-13.2,5.7-18.9l30.3-52.4c0.8-1.4,2.7-1.9,4.1-1.1c1.4,0.8,1.9,2.7,1.1,4.1L32.7,95c-2.9,4.9-4.5,10.6-4.9,16.3l-0.4,6.9l5.8-3.8C38,111.3,42,107,44.9,102l30.3-52.4c0.8-1.4,2.7-1.9,4.1-1.1c1.4,0.8,1.9,2.7,1.1,4.1L50,105c-3.3,5.8-8,10.7-13.5,14.4l-10.8,7.1C25.2,126.8,24.6,127,24,127z" /><path fill="#ff5576" d="M87.7,36.7c-0.5,0-1-0.1-1.5-0.4c-1.4-0.8-1.9-2.7-1.1-4.1c0.9-1.6,1.2-3.5,0.7-5.3s-1.6-3.3-3.3-4.2c-1.6-0.9-3.5-1.2-5.3-0.7s-3.3,1.6-4.3,3.3c-0.8,1.4-2.7,1.9-4.1,1.1s-1.9-2.7-1.1-4.1c3.6-6.2,11.6-8.3,17.8-4.8c3,1.7,5.2,4.5,6.1,7.9s0.4,6.9-1.3,9.9C89.7,36.2,88.7,36.7,87.7,36.7z" /><path fill="#ff5576" d="M87.7,33.7c2.8-4.8,1.1-10.9-3.7-13.7l0,0c-4.8-2.8-10.9-1.1-13.7,3.7l-3.7,6.5l17.3,10L87.7,33.7z" /><path fill="#ff5576" d="M83.9,43.2c-0.5,0-1-0.1-1.5-0.4l-17.3-10c-0.7-0.4-1.2-1.1-1.4-1.8c-0.2-0.8-0.1-1.6,0.3-2.3l3.7-6.5c3.6-6.2,11.6-8.3,17.8-4.8c3,1.7,5.2,4.5,6.1,7.9s0.4,6.9-1.3,9.9l-3.7,6.5c-0.4,0.7-1.1,1.2-1.8,1.4C84.4,43.2,84.2,43.2,83.9,43.2z M70.7,29.1l12.1,7l2.2-3.9l0,0c0.9-1.6,1.2-3.5,0.7-5.3s-1.6-3.3-3.3-4.2c-3.3-1.9-7.6-0.8-9.6,2.6L70.7,29.1z" /><g><path fill="#d32f56" d="M83.9,43.2c-0.5,0-1-0.1-1.5-0.4c-1.4-0.8-1.9-2.7-1.1-4.1l3.7-6.5c1-1.8,1.2-4,0.5-6c-0.6-1.6,0.2-3.3,1.8-3.9c1.6-0.6,3.3,0.2,3.9,1.8c1.4,3.7,1,7.7-0.9,11.1l-3.7,6.5C86,42.7,85,43.2,83.9,43.2z" /></g></g></svg>

            <svg onClick={removeById.bind(null, props.id)} className="me-3 svg-rem" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>


        </div>
    )
}

export default TodoItem
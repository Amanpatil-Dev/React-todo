import { useReducer,useState,useEffect } from "react"
import TodoContext from "./todo-context"
const defaltState = {
    todoItem: [],
    allTodo: 0,
    activeTodo: 0,
    completedTodo: 0,
    remainingTodo: 0,
    info:'',
    showinfo:''
}
const defaultTheme={
    dark:'darkTheme',
    light:'whiteTheme'
}
const todoReducer = (state, action) => {
    console.log(state, action)
    if (action.type === 'ADD_TODO') {

        const newTodo = state.todoItem.concat(action.item)
        const remainingTodo = newTodo.map((todo) => !todo.isCompleted)
        const completedTodo = newTodo.filter((todo) => todo.isCompleted)
        return {
            todoItem: newTodo,
            allTodo: remainingTodo.length,
            activeTodo: remainingTodo.length,
            completedTodo: completedTodo.length,
            remainingTodo: remainingTodo.length,
            info:'Successfully Added Todo',
            showinfo:true

        }
    }
    if (action.type === 'MARK_COMPLETE') {
        const existingItemIndex = state.todoItem.findIndex(todo => todo.id === action.id)
        const existingTodoItem = state.todoItem[existingItemIndex]

        let UpdatedItems
        const updatedItem = {
            ...existingTodoItem,
            isCompleted: !existingTodoItem.isCompleted
        }

        UpdatedItems = [...state.todoItem]
        UpdatedItems[existingItemIndex] = updatedItem

        const completedTodo = UpdatedItems.filter((todo) => todo.isCompleted)
        const remainingTodo = UpdatedItems.filter((todo) => !todo.isCompleted)

        return {
            todoItem: UpdatedItems,
            allTodo: UpdatedItems.length,
            activeTodo: remainingTodo.length,
            completedTodo: completedTodo.length,
            remainingTodo: remainingTodo.length,
            info:!existingTodoItem.isCompleted ? 'Successfully Marked Completed':'Successfully Marked Un-Completed',
            showinfo:true
        }

    }
    if (action.type === 'CLEAR_COMPLETED') {
        const completedTodo = state.todoItem.filter((todo) => todo.isCompleted)
        var uniqueResultArrayObjOne = state.todoItem.filter((objOne) => !completedTodo.some((objTwo) => objOne.id === objTwo.id))

        return {
            todoItem: uniqueResultArrayObjOne,
            allTodo: uniqueResultArrayObjOne.length,
            activeTodo: uniqueResultArrayObjOne.length,
            completedTodo: 0,
            remainingTodo: uniqueResultArrayObjOne.length,
            info:'Cleared All Completed Todo',
            showinfo:true
        }

    }
    if (action.type === 'DELETE_BY_ID') {
        const deleteTodo = state.todoItem.filter((todo) => {
            return todo.id !== action.id
        })

        const activeTodos = deleteTodo.filter((todo) => {
            return !todo.isCompleted
        })
        const completedTodos = deleteTodo.filter((todo) => {
            return todo.isCompleted
        })

        return {
            todoItem: deleteTodo,
            allTodo: deleteTodo.length,
            activeTodo: activeTodos.length,
            completedTodo: completedTodos.length,
            remainingTodo: activeTodos.length,
            info:'Successfully Deleted Todo',
            showinfo:true
        }
    }
    if (action.type === 'EDIT') {
        console.log(state, action)
        const existingItemIndex = state.todoItem.findIndex(todo => todo.id === action.todo.id)
        const existingTodoItem = state.todoItem[existingItemIndex]

        let UpdatedItems
        const updatedItem = {
            ...existingTodoItem,
            todo: action.todo.todo
        }

        UpdatedItems = [...state.todoItem]
        UpdatedItems[existingItemIndex] = updatedItem
        
        return {
            todoItem: UpdatedItems,
            allTodo: state.allTodo,
            activeTodo: state.activeTodo,
            completedTodo: state.completedTodo,
            remainingTodo: state.remainingTodo,
            info:'Successfully Edited Todo',
            showinfo:true

        }


    }
    if(action.type==='SHOW_TOAST_FALSE'){
      

        return {
            ...state,
            showinfo:false
        }
    }


}

const TodoProvider = (props) => {
    const [todoInit, dispatchTodo] = useReducer(todoReducer, defaltState)
    const [theme, setTheme] = useState(defaltState.dark);

    const addTodoHandler = (todo) => {
        dispatchTodo({ type: 'ADD_TODO', item: todo })

    }
    const markAsCompleteHandler = (id) => {
        dispatchTodo({ type: 'MARK_COMPLETE', id: id })
    }
    const clearCompletedTodoHandler = () => {
        dispatchTodo({ type: 'CLEAR_COMPLETED' })

    }
    const deleteByIdHandler = (id) => {
        dispatchTodo({ type: 'DELETE_BY_ID', id: id })
    }
    const editByIdHandler = (todo) => {
        dispatchTodo({ type: 'EDIT', todo: todo })
    }
    const toggleThemeHandler=(theme)=>{
        setTheme(theme)

    }
    const sideEffectToastHandler=()=>{
        dispatchTodo({type:'SHOW_TOAST_FALSE'})
    }
    useEffect(() => {
        switch (theme) {
          case defaultTheme.light:
            document.body.classList.add('whiteTheme');
            break;
          case defaultTheme.dark:
          default:
            document.body.classList.remove('whiteTheme');
            break;
        }
      }, [theme]);

    const todoContext = {

        addTodo: addTodoHandler,
        markAsComplete: markAsCompleteHandler,
        clearCompletedTodo: clearCompletedTodoHandler,
        deleteById: deleteByIdHandler,
        editById: editByIdHandler,
        toggleTheme:toggleThemeHandler,
        sideEffectToast:sideEffectToastHandler,
        todoItem: todoInit.todoItem,
        allTodo: todoInit.allTodo,
        activeTodo: todoInit.activeTodo,
        completedTodo: todoInit.completedTodo,
        remainingTodo: todoInit.remainingTodo,
        theme:theme,
        info:todoInit.info,
        showinfo:todoInit.showinfo
    }

    return (<TodoContext.Provider value={todoContext}>
        {props.children}
    </TodoContext.Provider>

    )
}

export default TodoProvider

import React from "react";

const todoContext=React.createContext({
    addTodo:(todo)=>{},
    markAsComplete:(id)=>{},
    clearCompletedTodo:()=>{},
    deleteById:(id)=>{},
    editById:(todo)=>{},
    toggleTheme:(theme)=>{},
    theme:'',
    todoItem:[],
    allTodo:0,
    activeTodo:0,
    completedTodo:0,
    remainingTodo:0,
    info:''
})

export default todoContext
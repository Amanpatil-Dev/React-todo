import TodoHeader from "./Components/TodoHeader/TodoHeader";
import TodoInput from "./Components/TodoInput/TodoInput";
import Container from "./Components/Layout/Container";
import Row from "./Components/Layout/Row";
import Column from "./Components/Layout/Column";
import TodoItem from "./Components/TodoItem/TodoItem";
import TodoStatus from "./Components/TodoStatus/TodoStatus";
import React, { useContext, useEffect, useState } from "react";
import todoContext from "./todo/todo-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
 
  autoClose: 2000,
  
};

function App() {
  const tdContext = useContext(todoContext)
  const [initState, setState] = useState('All')
  const [editState, setEditState] = useState({
    id:'',
    todo:''
  })
 
  const handleStatus = (status) => setState(status)

   tdContext.info !=="" && toast.success(tdContext.info,options)

  useEffect(()=>{
    if(tdContext.theme){
      document.body.classList.add('whiteTheme')

    }else{
      document.body.classList.add('darkTheme')

    }

  },[tdContext.theme])

  const handleEdit = (id) => {
    const todoToEdit = tdContext.todoItem.filter((todo) =>  todo.id === id)
    setEditState({id:id,todo:todoToEdit[0].todo})
  }
  const handleOnChange=(e)=>setEditState({id:editState.id,todo:e.target.value})

  const onhandleEdit = ()=>tdContext.editById(editState)

  return (
    <React.Fragment>
      <ToastContainer/>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit todo</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <input type="text" class="form-control" onChange={handleOnChange} value={editState.todo} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick={onhandleEdit} data-bs-dismiss="modal">Save Changes</button>
             
            </div>
          </div>
        </div>
      </div>
      <section class={`${tdContext.theme==='whiteTheme'?'bg-gradient-custom-light':'bg-gradient-custom-dark'}`}>
        <Container>
          <Row className="row justify-content-center">
            <Column className="todo col-lg-6 col-md-10 col-sm-12">
              <TodoHeader />
            </Column>
          </Row>

          <Row className="row justify-content-center ">
            <Column className="col-lg-6 col-md-10 col-sm-12 ">
              <TodoInput />
            </Column>
          </Row>
        </Container>
      </section>

      <section>
        <Container className="container">
          <Row className="row todo-main-container justify-content-center">
            <Column className="todo-grid col-lg-6 col-md-10 col-sm-12 mb-3 ">

              {tdContext.todoItem.map((todo) => (
                <TodoItem getEditTodoId={handleEdit} key={todo.id} status={initState} isComplete={todo.isCompleted} todo={todo.todo} id={todo.id} />

              ))}

              {tdContext.todoItem.length > 0 && <TodoStatus setStatus={handleStatus} />}

            </Column>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default App;

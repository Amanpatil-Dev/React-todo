
function DisplayStatus(props){
    const showTodoBasedOnFilter=(status)=>{
        
        props.sendStatus(status)
        

    }
    return (
        <p className={`mx-2 text-capitalize ${props.className}`} onClick={showTodoBasedOnFilter.bind(null,props.status)} >{props.status}
                        {/* <span class="position-absolute  translate-middle badge rounded-pill bg-danger">
                            {props.status === 'All' ? props.all :props.status === 'Active'?props.active:props.status==='Completed'?props.completed:'' }
                        </span> */}
                    </p>
    )
}

export default DisplayStatus
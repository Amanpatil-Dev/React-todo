import React from "react"
const Input= React.forwardRef((props,ref) =>{
    const onCustomKeyUp=(e)=>{
        if(e.keyCode === 13){
            props.onKeyUp()

        }
    }
    return (
        <input className={props.className} ref={ref} onKeyUp={onCustomKeyUp} {...props.input}></input>
    )
})

export default Input
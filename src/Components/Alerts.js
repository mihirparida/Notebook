import React from 'react'

export default function Alert(props) {
    const capital =(word)=>{
        if(word === "danger"){
            word = "error"
        }
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return (
        // && at 1st means if (before &&) that is props.alert is null/false then (after &&)things will not work and 
        // if props.alert is (not null/true) then (after &&)things will  work.
        <div style = {{height:"54px"}}>
        {props.alert && <div className= {`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capital(props.alert.type)} </strong>: {props.alert.mssg}
        </div>}
        </div>
    )
}

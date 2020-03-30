import React from "react"

export default function ToDoItem (props){

    return (
        <li onClick= {()=>{props.ifClicked(props.id)}}>{props.content}</li>
    )
}
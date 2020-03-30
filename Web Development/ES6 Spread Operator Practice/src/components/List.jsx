import React, {useState} from "react";
import ToDoItem from "./ToDoItem";


export default function List (props){

    function deleteItem(id){
      props.onDelete(id);
    }

    function generateList(items){
        return (items.map((item, index)=>{
            return (<ToDoItem key ={index} id={index} content={item} ifClicked={deleteItem}/>)
        }))
    }

    return (
        <div>
        <ul>
          {generateList(props.items)}
        </ul>
      </div>
    )
}
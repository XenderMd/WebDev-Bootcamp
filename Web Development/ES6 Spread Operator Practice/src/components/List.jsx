import React, {useState} from "react";


export default function List (props){

    function generateList(items){
        return (items.map((item, index)=>{
            return (<li>{item}</li>)
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
import React from "react";
import Entry from "./Entry"
import {emojipedia} from "../emojipedia";

export default function Dictionary (props){
    return (
        <dl className="dictionary">        
        {emojipedia.map((entry, index)=>{
            return <Entry key={index} emoji={entry.emoji} name={entry.name} meaning={entry.meaning} />
        })}
      </dl>
    )
}
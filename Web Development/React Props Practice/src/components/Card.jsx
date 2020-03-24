import React from "react";
import Avatar from "./Avatar";
import Details from "./Details"
import { createPropertySignature } from "typescript";

export default function Card (props){

    return (
        <div className="card">
          <div className="top">
            <p>{props.keyVal}</p>
            <h2 className="name">{props.name}</h2>
            <Avatar imgURL={props.imgURL}/>
          </div>
          <div className="bottom">
            <Details phone={props.phone} email ={props.email}/>
          </div>
        </div>
    );
};


import React from "react";

{console.log("contacts")}

export default function Card (props){

    return (
        <div className="card">
          <div className="top">
            <h2 className="name">{props.name}</h2>
            <img
              className="circle-img"
              src={props.imgURL}
              alt="avatar_img"
            />
          </div>
          <div className="bottom">
            <p className="info">{props.phone}</p>
            <p className="info">{props.email}</p>
          </div>
        </div>
    );
};


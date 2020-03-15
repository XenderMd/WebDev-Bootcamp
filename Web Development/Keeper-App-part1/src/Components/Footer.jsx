import React from "react"

const year = (new Date()).getFullYear();

export default function Footer(){
    return(
        <footer>
        <p>Copyright Stavila Denis {year}</p>  
        </footer>
    );
}
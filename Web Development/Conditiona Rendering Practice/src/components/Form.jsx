import React from "react";

function Form(props) {
 let buttonText = "";
 {props.flag ? buttonText="Login": buttonText="Register"}
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {!props.flag && <input type="password" placeholder="Confirm Password" />}
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default Form;

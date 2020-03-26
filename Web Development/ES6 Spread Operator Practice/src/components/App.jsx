import React, { useState } from "react";
import List from "./List"

function App() {

  const [items, setItems]=useState([]);
  const [inputText, setInputText] = useState("");

  function addItem(event){
    setItems((prevState)=>{return([...prevState, inputText])});
    setInputText("");
  }

  function handleKey(event){
    if(event.charCode===13){
      addItem();
    }
  }

  function handleValue(event){
    setInputText(event.target.value);
  }

  
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input name = "item" type="text" value ={inputText} onChange={handleValue} onKeyPress={handleKey} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
        <List items={items} />
      </div>

    </div>
  );
}

export default App;

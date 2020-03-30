import React, {useState} from "react";

function CreateArea(props) {

  const [note, setNote] = useState({title:"", content:""})

  function onTitleChange(event){
    const newTitle = event.target.value;
    setNote((prevState)=>{return(
      {
        ...prevState,
        ["title"]:newTitle
      }
    )})
  }

  function onContentChange(event){
    const newContent = event.target.value;
    setNote((prevState)=>{return(
      {
        ...prevState,
        ["content"]:newContent
      }
    )})
  }

  function addHandler(event){
    props.ifAdd(note);
    event.preventDefault();
  }
  
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" value ={note.title} onChange={onTitleChange}/>
        <textarea name="content" onChange={onContentChange} value={note.content} placeholder="Take a note..." rows="3" />
        <button onClick={addHandler}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

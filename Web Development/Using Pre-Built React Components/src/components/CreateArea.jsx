import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [focus, setFocus] = useState(false);
  const [rowNum, setRowNum] = useState(1);

  function handleFocus (event){
    setFocus(true);
    setRowNum(3);
  }

  function handleBlur(event){
    setFocus(false);
    setRowNum(1);
  }


  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        { focus && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> }
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rowNum}
        />
        <Zoom in={focus}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes] = useState([{title:"Example Note", content:"Random Content"}]);

  function addNote(note){
    setNotes((prevState)=>{return [...prevState, note]});
  }

  function deleteNote(ID){
    setNotes((prevState)=>{return prevState.filter((item, index)=>{return index!==ID;}) })
  }

  function displayNotes(notes){
    return (
      notes.map((note, index)=>{return(<Note key={index} id={index} title={note.title} content={note.content} ifDelete={deleteNote}/>)})
    )
  }


  return (
    <div>
      <Header />
      <CreateArea ifAdd={addNote}/>
      {displayNotes(notes)}
      <Footer />
    </div>
  );
}

export default App;

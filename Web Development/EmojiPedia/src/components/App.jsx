import React from "react";
import Entry from "./Entry";
import Header from "./Header";
import Dictionary from "./Dictionary";
import emojipedia from "../emojipedia";

function App() {
  return (
    <div>
      <Header title="emojipedia" />
      <Dictionary />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

// import CreateNote from "./components/createNote";
import CreateUser from "./components/CreateUser";
import Navigation from "./components/navigation";
import NoteList from "./components/NoteList";

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <div className="container p-4">
        <Route path="/" exact component={NoteList} />
        <Route path="/user/create" component={CreateUser} />
        {/* <Route path="/note/edit/:id" component={CreateNote} />
        <Route path="/note/create/" component={CreateNote} /> */}
      </div>
    </Router>
  );
}
export default App;

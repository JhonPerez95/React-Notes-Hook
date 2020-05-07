import React, { useState, useEffect } from "react";

import Axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await Axios.get("http://localhost:4000/api/notes");
    setNotes(res.data.noteDb);
  };

  const headleDelete = async (id) => {
    await Axios.delete(`http://localhost:4000/api/notes/${id}`);
    getNotes();
  };

  // Update el DOM
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="row">
      {notes.map((note) => (
        <div className="col-md-4 p-2" key={note._id}>
          <div className="card">
            <div className="card-header d-flex justify-content-between ">
              <h5>{note.title}</h5>
              <Link to={"/note/edit/" + note._id} className="btn btn-secondary">
                Edit
              </Link>
            </div>
            <div className="card-body">
              <p>{note.description}</p>
              <p>{note.user.username}</p>
              <p>{format(note.date)}</p>
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => headleDelete(note._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

import React, { useState, useEffect } from "react";

import Axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API = process.env.REACT_APP_API;

export default function CreateNote(props) {
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [userSelect, setUserSelect] = useState("");

  const [idNote, setNoteId] = useState("");
  const [update, setUpdate] = useState(false);

  // LOAD DOMgetNote
  useEffect(() => {
    getNote();
  }, []);

  // useEffect(() => {
  //   getNote();
  // }, [update]);

  // GET INFO
  const getInfo = async () => {
    const res = await Axios.get(`${API}/api/users`);
    setUsers(res.data.usersDb);

    setUserSelect(res.data.usersDb[0]._id);
  };

  //

  // INFO NOTE
  const getNote = async () => {
    await getInfo();
    const idNote = props.match.params.id;
    const res = await Axios.get(`${API}/api/notes/${idNote}`);

    setTitle(res.data.noteDb.title);
    setDescription(res.data.noteDb.description);
    setDate(new Date(res.data.noteDb.date));
    setUserSelect(res.data.noteDb.user._id);
    setUpdate(true);
    setNoteId(props.match.params.id);
  };

  // SAVE NOTES
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      title,
      description,
      date,
      user: userSelect,
    };

    if (update) {
      await Axios.put(`${API}/api/notes/${idNote}`, newNote);
    } else {
      await Axios.post(`${API}/api/notes`, newNote);
    }

    window.location.href = "/";
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <form className=" card card-body" onSubmit={handleSubmit}>
          <h4>Create Note</h4>

          <div className="form-group">
            <select
              className="form-control"
              name="userSelect"
              value={userSelect}
              onChange={(e) => {
                setUserSelect(e.target.value);
              }}
            >
              {users.map((user) => (
                <option value={user._id} key={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control "
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={date}
                onChange={(data) => {
                  setDate(data);
                }}
              />
            </div>

            <button className="btn btn-primary">save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

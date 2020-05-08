import React, { useState, useEffect } from "react";

import Axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

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
    getInfo();
  }, []);

  // useEffect(() => {
  //   getNote();
  // }, [update]);

  // GET INFO
  const getInfo = async () => {
    const res = await Axios.get("http://localhost:4000/api/users");
    setUsers(res.data.usersDb);
    if (!props.match.params.id) {
      setUserSelect(res.data.usersDb[0]._id);
    } else {
      getNote();
    }
  };

  //

  // INFO NOTE
  const getNote = async () => {
    const idNote = props.match.params.id;
    const res = await Axios.get(`http://localhost:4000/api/notes/${idNote}`);

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
      await Axios.put(`http://localhost:4000/api/notes/${idNote}`, newNote);
    } else {
      await Axios.post("http://localhost:4000/api/notes", newNote);
    }
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
            <Link className="btn btn-primary" to="/" type="submit">
              save
            </Link>
            {/* <button className="btn btn-primary">Save</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

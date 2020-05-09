import React, { useState, useEffect } from "react";

import Axios from "axios";

const API = process.env.REACT_APP_API;

export default function CreateUser() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  const getUsers = async () => {
    const res = await Axios.get(`${API}/api/users`);
    setUsers(res.data.usersDb);
  };

  // Update el DOM
  useEffect(() => {
    getUsers();
  }, []);

  // SAVE USER
  const hadleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
    };
    await Axios.post(`${API}/api/users`, data);
    getUsers();
    setUsername(" ");
  };

  // DELETED USER
  const handlerDelete = (id) => {
    Axios.delete(`${API}/api/users/${id}`);
    getUsers();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className=" card card-body">
          <h3>Crearte New User</h3>
          <form onSubmit={hadleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
              onDoubleClick={() => handlerDelete(user._id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

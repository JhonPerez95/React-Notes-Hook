import axios from 'axios';
const API = process.env.REACT_APP_API;

const findNotes = async (id) => {
  const res = await axios.get(`${API}/api/notes/${id}`);

  return res.data.noteDb;
};

export { findNotes };

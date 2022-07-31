import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos, addTodos } from "../../redux";
import "./AddTask.css";

export default function AddTask({setMenu}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  function handleDateChange(e) {
   setDate(e.target.value);
  }
  function handleDescriptionChange(e) {
   setDescription(e.target.value);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTodos({ title, description, date }));
    setMenu(false)
  }
  function handleCancel() { 
    setMenu(false)
  }

  return (
    <>
        <div className="add-menu">
          <div>
            <input
              type="text"
              placeholder="Titre"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="Description"
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="date-menu">
            <button className="btn">
              <img src="" alt="" />
              Aujourd'hui
            </button>
            <button className="btn">
              <img src="" alt="" />
              Demain
            </button>
            <input type="date" onChange={handleDateChange} />
          </div>
          <div className="submit-panel">
            <button type="submit" className="btn" onClick={handleSubmit}>
              Ajouter
            </button>
            <button type="submit" className="btn" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        </div>
    </>
  );
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, fetchCategories, categoriesSelectors } from "../../redux";
import "./TaskForm.css";

export default function AddTask({ setMenu }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const categories = useSelector(categoriesSelectors.selectAll)
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  function handleDateChange(e) {
    setDate(e.target.value);
  }
  function setDateToday() {
    // Ajouter time : heures + minutes
    let now = new Date()
    let date = now.toLocaleDateString()
    let formattedDate = date.split('/').reverse().join('-')
    setDate(formattedDate)
  }
  function setDateTomorrow() {
    let now = new Date()
    let today = now.getDate()
    now.setDate(today + 1)
    let date = now.toLocaleDateString()
    let formattedDate = date.split('/').reverse().join('-')
    setDate(formattedDate)
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTodos({ title, description, date, category }));
    setMenu(false);
  }
  function handleCancel() {
    setMenu(false);
  }
  function handleCategoryChange(e) {
    setCategory(e.target.value)
  }
  return (
    <>
      <div className="add-form">
        <div>
          <input type="text" placeholder="Titre" onChange={handleTitleChange} />
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
          <div className="date-text">
            <h2>Date :</h2>
          </div>
          <div className="date-buttons">
              <button className="btn-date btn-date--green" onClick={setDateToday}>
                <img src="" alt="" />
                Aujourd'hui
              </button>
              <button className="btn-date btn-date--blue" onClick={setDateTomorrow}>
                <img src="" alt="" />
                Demain
              </button>
            <input type="date" onChange={handleDateChange} />
          </div>
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

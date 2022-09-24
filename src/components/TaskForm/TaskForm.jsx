import React, { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import fr from "date-fns/esm/locale/fr/index.js";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, fetchCategories, categoriesSelectors } from "../../redux";
import "./TaskForm.css";

export default function AddTask({ setMenu }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const categories = useSelector(categoriesSelectors.selectAll);
  const [title, setTitle] = useState(null);
  const [selected, setSelected] = useState(new Date());
  const [isDateDD, toggleDateDropD] = useState(false);
  const [isCatDD, toggleCatDropD] = useState(false);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const catOpts = document.querySelector(".category-container");
  const categoryBtn = document.querySelector("#categoryBtn");
  const dateOpts = document.querySelector(".rdp");
  const dateBtn = document.querySelector("#dateBtn");

  function handleDateChange(e) {
    setDate(e.target.value);
  }
  function setDateToday() {
    // Ajouter time : heures + minutes
    let now = new Date();
    let date = now.toLocaleDateString();
    let formattedDate = date.split("/").reverse().join("-");
    setDate(formattedDate);
  }
  function setDateTomorrow() {
    let now = new Date();
    let today = now.getDate();
    now.setDate(today + 1);
    let date = now.toLocaleDateString();
    let formattedDate = date.split("/").reverse().join("-");
    setDate(formattedDate);
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
    setCategory(e.target.id);
  }
  const handleDateDropD = () => {
    if (isDateDD) {
      dateOpts.classList.add("hide");
      dateBtn.classList.remove("selected")
      categoryBtn.classList.remove("selected")
      toggleDateDropD(false);
    } else {
      dateOpts.classList.remove("hide");
      dateBtn.classList.add("selected")
      categoryBtn.classList.remove("selected")
      toggleDateDropD(true);
      toggleCatDropD(false);
    }
  };
  const handleCatDropD = () => {
    console.log(categoryBtn)
    if (isCatDD) {
      catOpts.classList.add("hide");
      categoryBtn.classList.remove("selected")
      dateBtn.classList.remove("selected")
      toggleCatDropD(false);
    } else {
      catOpts.classList.remove("hide");
      categoryBtn.classList.add("selected")
      dateBtn.classList.remove("selected")
      toggleCatDropD(true);
      toggleDateDropD(false);
    }
  };
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
        <div className="options-menu">
          <div>
            <h3 className="form-opt-btn" id="dateBtn" onClick={handleDateDropD}>
              Date
            </h3>
            <DayPicker
              style={{ display: isDateDD ? "" : "none" }}
              mode="single"
              locale={fr}
              disabled={(date) => date <= new Date() - 86400000}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
          <div>
            <h3 className="form-opt-btn" id="categoryBtn" onClick={handleCatDropD}>
              Catégorie(s)
            </h3>
            <div className="category-container" style={{ display: isCatDD ? "" : "none" }}>
              <div >
                {categories.length == 0 ? (
                  <div className="category-box  noCategoryItem">
                    <h3 className="category-item">Aucune catégorie</h3>
                  </div>
                ) : (
                  Object.values(categories).map((category) => (
                    <div className="category-box">
                      <input type="checkbox" name="" id={category.id} onChange={handleCategoryChange} />
                      <h3 className="category-item">{category.title}</h3>
                    </div>
                  ))
                )}
              </div>
            </div>
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

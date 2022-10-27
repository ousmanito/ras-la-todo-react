import React, { useEffect, useLayoutEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import deleteImg  from "./delete.svg"
import { DayPicker } from "react-day-picker";
import format from "date-fns/format";
import fr from "date-fns/esm/locale/fr/index.js";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, fetchCategories, categoriesSelectors, fetchTodos, addCategories, deleteCategories } from "../../redux";
import "./TaskForm.css";

export default function AddTask({ setMenu }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTodos());
  }, []);
  const categories = useSelector(categoriesSelectors.selectAll);
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(new Date());
  const pythonDate = format(date, "yyyy-MM-dd")
  const [isDateDD, toggleDateDropD] = useState(false);
  const [isCatDD, toggleCatDropD] = useState(false);
  const formCategories = []
  const [description, setDescription] = useState("");
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const catOpts = document.querySelector(".category-container");
  const categoryBtn = document.querySelector("#categoryBtn");
  const dateOpts = document.querySelector(".rdp");
  let dateBtn = document.querySelector("#dateBtn");

  const handleEnterCategory = (e) => {
    const value = e.target.value
    if(e.key === "Enter" && value.length > 0) {
      e.preventDefault();
      dispatch(addCategories(value))
    }
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    const categories = formCategories ? formCategories : [undefined]
    dispatch(addTodos({ title, description, pythonDate, categories }));
    if(title) {
      setMenu(false)
    } else {
      alert("Veuillez renseigner au moins un titre !")
    }
  }
  function handleCancel() {
    setMenu(false);
  }
  function handleCategoryChange(e) {
    const id = parseInt(e.target.id)
    const index = formCategories.indexOf(id)
    if(e.target.checked == true){
      formCategories.push(id)
    } else {
      if(index > -1) {
        formCategories.splice(index, 1)
      }
    }
  }  

  const handleDateDropD = () => {
    if (isDateDD) {
      dateOpts.classList.add("hide");
      dateBtn.classList.remove("selected");
      categoryBtn.classList.remove("selected");
      toggleDateDropD(false);
    } else {
      dateOpts.classList.remove("hide");
      dateBtn.classList.add("selected");
      categoryBtn.classList.remove("selected");
      toggleDateDropD(true);
      toggleCatDropD(false);
    }
  };
  const handleCatDropD = () => {
    if (isCatDD) {
      catOpts.classList.add("hide");
      categoryBtn.classList.remove("selected");
      dateBtn.classList.remove("selected");
      toggleCatDropD(false);
    } else {
      catOpts.classList.remove("hide");
      categoryBtn.classList.add("selected");
      dateBtn.classList.remove("selected");
      toggleCatDropD(true);
      toggleDateDropD(false);
    }
  };

  const handleDeleteCategory = (e) => {
    const categoryId = e.target.parentElement.children[0].id
    dispatch(deleteCategories(categoryId))

  }

  const func = () => {
    localStorage.setItem("date", JSON.stringify(date.toLocaleDateString("fr-FR", options)));
    const cleanDateArr = date.toLocaleDateString("fr-FR", options).split(' ')
    const day = cleanDateArr[0].charAt(0).toUpperCase() + cleanDateArr[0].slice(1) + " "
    const dayNumber = cleanDateArr[1] + " "
    const month = cleanDateArr[2].charAt(0).toUpperCase() + cleanDateArr[2].slice(1) + " "
    const year = cleanDateArr[3] == new Date().getFullYear() ? "" : cleanDateArr[3]
    return day.concat(dayNumber, month, year);
  }

  return (
    <>
      <div className="add-form">
        <div>
          <input type="text" placeholder="Titre" onChange={handleTitleChange} required={true}/>
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
              {date
                ? func()
                : JSON.parse(localStorage.getItem('date'))}
            </h3>
            <DayPicker
              style={{ display: isDateDD ? "" : "none" }}
              mode="single"
              locale={fr}
              disabled={(date) => date <= new Date() - 86400000}
              selected={date}
              onSelect={setDate}
            />
          </div>
          <div>
            <h3
              className="form-opt-btn"
              id="categoryBtn"
              onClick={handleCatDropD}
            >
              Catégorie(s)
            </h3>
            <div
              className="category-container"
              style={{ display: isCatDD ? "" : "none" }}
            >
              <div>
                {categories.length == 0 ? (
                  <div className="category-box  noCategoryItem">
                    <h3 className="category-item">Aucune catégorie</h3>
                  </div>
                ) : (
                  Object.values(categories).map((category) => (
                    <div key={category.id} className="category-box">
                      <input
                        type="checkbox"
                        name=""
                        id={category.id}
                        onChange={handleCategoryChange}
                      />
                      <h3 className="category-item">{category.title}</h3>
                      <img src={deleteImg} onClick={handleDeleteCategory}></img>
                    </div>
                  ))
                )}
                  <div className="category-box  ">
                    <input type="text" onKeyDown={handleEnterCategory} maxLength="15"/>
                  </div>
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

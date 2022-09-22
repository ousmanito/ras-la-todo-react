import React, { useState } from "react";
import "./SearchDropDown.css";
import { todosSelectors } from "../../redux";
import { useSelector } from "react-redux";

export const SearchDropDown = () => {
  let searchItems = document.querySelector("#searchContent");
  const tasks = useSelector(todosSelectors.selectAll);
  const [results, setResultIds] = useState([]);
  const [noResults, setNoResults] = useState(false)

  const showContent = () => {
    searchItems.classList.remove("hide");
  };
  const hideContent = () => {
    searchItems.classList.add("hide");
    setNoResults(false)
  };

  const handleChange = (e) => {
    let resultIds = [];
    const search = e.target.value;
    if (search != "") {
      for (const index in tasks) {
        if (
          (search !== "" &&
          (tasks[index].description.toLowerCase().includes(search.toLowerCase())) ||
          tasks[index].title.toLowerCase().includes(search.toLowerCase()))
          ) {
            resultIds.push(index);
          } else {
          }
          resultIds.length == 0 ? setNoResults(true) : setNoResults(false)
          setResultIds(resultIds);
      }
    } else if (search == "") {
      setResultIds([]);
    }
  };
  return (
    <>
      <div className="search">
        <input
          className="searchInput"
          onChange={handleChange}
          onFocus={showContent}
          onBlur={hideContent}
          type="text"
          placeholder="Rechercher"
        />
      </div>
      <div id="searchContent" className="searchItems">
        {noResults ? (
          <div className="noResults">
            <h4>Aucuns résultats</h4>
          </div>
        ) : ""}
        { results.length > 0 ? (
          results.map((index) => {
            return (
              <div key={tasks[index].key}>
                <span className="checkbox"></span>
                <h4>{tasks[index].title}</h4>
              </div>
            );
          })
        ) : ""}
      </div>
    </>
  );
};

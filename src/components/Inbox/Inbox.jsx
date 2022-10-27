import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos,fetchTaskCategories, todosSelectors, taskCategoriesSelectors, categoriesSelectors, fetchCategories } from "../../redux";
import TaskItem from "../TaskItem/TaskItem";
import AddTask from "../TaskForm/TaskForm"
import add from "./add.png";
import "./Inbox.css";

export default function Inbox() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodos())
    dispatch(fetchTaskCategories())
    dispatch(fetchCategories())
  },[])
  const tasks = useSelector(todosSelectors.selectAll)
  const categories = useSelector(categoriesSelectors.selectAll)
  const userTasks = useSelector(taskCategoriesSelectors.selectAll)

  
  const [showAddMenu, setShowAddMenu] = useState(false);
  const setMenu = useCallback(() => {
    setShowAddMenu(!showAddMenu)
  })

  return (
    <div className="tasks">
      <h1>Boîte de réception  </h1>
      <div className="add-task" onClick={() => {
          setShowAddMenu(!showAddMenu)
  }}>
        <img src={add} alt="ADD" />
        <h3>Ajouter une nouvelle tâche</h3>
      </div>
      {showAddMenu == true && <AddTask setMenu={setMenu}/> }
      <div className="tasks">
       <TaskItem tasks={tasks} />
      </div>
    </div>
  );
}

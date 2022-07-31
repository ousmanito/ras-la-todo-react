import React, { Component } from "react";
import "./TodayTasks.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodos, fetchTodos, todosSelectors } from "../../redux";
import { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import add from "../Tasks/add.png"
import AddTask from "../AddTask/AddTask"

const TodayTasks = () => {
  const [showAddMenu, setShowAddMenu] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const tasks = useSelector(todosSelectors.selectAll);
  const deleteTodo = (id) => {
    dispatch(deleteTodos(id))
  }
  return (
    <>
      <h1>Aujourd'hui !</h1>
      <div className="add-task"  onClick={() => {
        setShowAddMenu(!showAddMenu)
      }}>
        <img src={add} alt="ADD" />
        <h3>Ajouter une nouvelle tâche</h3>
      </div>
      {showAddMenu == true && <AddTask/> }
      <div className="tasks">
       <TaskItem tasks={tasks}/>
      </div>
    </>
  );
};

export default TodayTasks;

import React, { Component } from "react";
import "./Today.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodos, fetchTodos, todosSelectors } from "../../redux";
import { useEffect, useState, useCallback } from "react";
import TaskItem from "../TaskItem/TaskItem";
import add from "./add.png";
import TaskForm from "../TaskForm/TaskForm"

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
  const setMenu = useCallback(() => {
    setShowAddMenu(!showAddMenu)
  })
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const date = new Date()
  return (
    <>
      <h1>Aujourd'hui, {date.getDate()} {months[date.getMonth()]}</h1>
      <div className="add-task"  onClick={() => {
        setShowAddMenu(!showAddMenu)
      }}>
        <img src={add} alt="ADD" />
        <h3>Ajouter une nouvelle tâche</h3>
      </div>
      {showAddMenu == true && <TaskForm setMenu={setMenu}/> }
      <div className="tasks">
       <TaskItem tasks={tasks}/>
      </div>
    </>
  );
};

export default TodayTasks;

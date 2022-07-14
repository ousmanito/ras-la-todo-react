import React, { Component } from "react";
import "./TodayTasks.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, todosSelectors } from "../../redux";
import { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";

const TodayTasks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const tasks = useSelector(todosSelectors.selectAll);
  return (
    <>
      <h1>Aujourd'hui !</h1>
      <div className="tasks">
       <TaskItem tasks={tasks}/>
      </div>
    </>
  );
};

export default TodayTasks;

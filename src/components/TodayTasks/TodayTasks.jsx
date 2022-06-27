import React, { Component } from "react";
import "./TodayTasks.css";
import { useSelector, useDispatch} from "react-redux";
import { actions, fetchTodos, todosSelectors } from "../../redux";
import { useEffect } from "react";
import axios from "axios";

const TodayTasks = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  const tasks = useSelector(todosSelectors.selectAll)
  console.log(tasks)
  tasks.map(task => {
    return(
    <>
      <div>{task.title}</div>
      <h1>Hello world</h1>
    </>
    )
  })
};


export default TodayTasks;

import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "../withRouter";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }
 
  componentDidMount() {

      if(localStorage.getItem('token') === null) {
        window.location.assign('/login')
      }
      
    
    axios
      .get("http://127.0.0.1:8000/api/task/", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        this.setState({
          tasks: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let todoList = this.state.tasks;
    console.log(localStorage.getItem("isWrong"));
    return (
      <div>
        {todoList.map((task) => {
          return <h1 key={task.key}>{task.title}</h1>;
        })}
      </div>
    );
  }
}

export default withRouter(Tasks);

import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "../withRouter";

export class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }
  render() {
    axios
      .get("http://127.0.0.1:8000/api/task/", {
        headers: { Authorization: `Token ${this.props.location.state.token}` },
      })
      .then((res) => {
        this.setState({
          tasks: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return (
      <div>
          {this.state.tasks.map((task) => {
              return (
                  <h1>{task.title}</h1>
              )
          })}
      </div>
    );
  }
}

export default withRouter(Tasks);

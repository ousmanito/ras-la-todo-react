import React, { Component } from 'react'
import Header from '../Header/Header'
import NavBar from '../Navbar/NavBar'

export default class Home extends Component {
  componentDidMount () {
    if(localStorage.getItem('token') !== null) {
      window.location.assign('/tasks/all')
    }
  }
  render() {
    return (
      <div>
          <NavBar/>
          <Header/>
      </div>
    )
  }
}

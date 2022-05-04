import React, { Component } from 'react'
import Header from '../Header/Header'
import NavBar from '../Navbar/NavBar'

export default class Home extends Component {
  render() {
    return (
      <div>
          <NavBar/>
          <Header/>
      </div>
    )
  }
}

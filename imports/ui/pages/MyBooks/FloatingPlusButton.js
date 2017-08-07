import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Books.css'

export default class FloatingPlusButton extends Component {
  render(){
    return(
      <div className="floating-plus-button">
        <Link to="/my-book/search" onClick={this.props.onClick}>Add a book</Link>
      </div>
    )
  }
}
// Might be too componentized by breaking this floating button into a separate component but it helps to reduce the JSX in the top level component and also it could be reuse for other page when doing the personal project Sunnotes.

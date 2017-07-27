import React, { Component } from 'react'
import './ProgressTab.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import _ from 'lodash'
import { Grid, Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'
import validate from '../../../modules/validate'
import Files from '../../../api/Files/files'

import DocEditor from '../../components/DocumentEditor/DocEditor'
import LibEditor from '../../components/DocumentEditor/LibEditor'
import JacketUploader from '../../components/DocumentEditor/JacketUploader'


class NewLibrary extends Component {
  render() {
    const bookId = this.props.match.params
    const { history } = this.props
    return (
      <div className="NewDocument">
        <div className="EditorMenuList">
         <ul className="TabList">
           <Link to="/documents/new"><li className="Tab">Upload Cover</li></Link>
           <Link to="/documents/new/book-info"><li className="Tab">Book Info</li></Link>
           <li className="Tab_Selected">Libraries</li>
         </ul>
        </div>
        <div style={{marginTop: "50px"}}>
          <LibEditor history={history} bookId={bookId} />
        </div>
      </div>
    )
  }
}

NewLibrary.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewLibrary

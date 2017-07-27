import React, { Component } from 'react';
import './NewDocument.scss'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import _ from 'lodash'
import { Grid, Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'
import validate from '../../../modules/validate'
import Files from '../../../api/Files/files'

import DocEditor from '../../components/DocumentEditor/DocEditor'

class NewBook extends Component {
  render() {
    const { history, files } = this.props
    return (
      <div className="NewDocument">
        <div className="EditorMenuList">
         <ul className="TabList">
           <Link to="/documents/new"><li className="Tab">Upload Cover</li></Link>
           <Link to="/documents/new/book-info"><li className="Tab_Selected">Book Info</li></Link>
          <li className="Tab">Libraries</li>
         </ul>
        </div>
        <div style={{marginTop: "50px"}}>
          <DocEditor history={history} files={files} />
        </div>
      </div>
    )
  }
}

NewBook.propTypes = {
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('files');
  return {
    loading: !subscription.ready(),
    files: Files.find({ userId: Meteor.userId() }).fetch().reverse()
  };
}, NewBook);

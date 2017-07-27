import React, { Component } from 'react';
import './NewDocument.scss'
import './ProgressTab.css'
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
import LibEditor from '../../components/DocumentEditor/LibEditor'
import JacketUploader from '../../components/DocumentEditor/JacketUploader'


class NewJacket extends Component {
  render() {
    const { history } = this.props
    console.log(this.props.files)
    return (
      <div className="NewDocument">
        <div className="EditorMenuList">
         <ul className="TabList">
           <li className="Tab_Selected">Upload Cover</li>
           <Link to="/documents/new/book-info"><li className="Tab">Book Info</li></Link>
           <li className="Tab">Libraries</li>
         </ul>
        </div>
        <div style={{marginTop: "50px"}}>
          <JacketUploader history={history} />
        </div>
      </div>
    )
  }
}

NewJacket.propTypes = {
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('files');
  return {
    loading: !subscription.ready(),
    files: Files.find({ userId: Meteor.userId() }).fetch().reverse()
  };
}, NewJacket);

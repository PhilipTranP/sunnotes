import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import DocumentsCollection from '../../../api/Libraries/libraries';
import Loading from '../../components/Loading/Loading';

import './Requests.scss';


class Available extends Component {
  render(){
    var user = Meteor.user();
    var email = user && user.emails && user.emails[0].address
    console.log(email)
    const { loading, documents, match, history } = this.props
    if(loading) {return <Loading />}
      return (
          <div className="Documents">
            <div className="page-header clearfix">
              <h4 className="pull-left">Recent Requests</h4>
            </div>
            {documents.length ? <Table responsive>
              <thead>
                <tr>
                  <th>Library</th>
                  <th>Time</th>
                  <th>BookId</th>
                  <th>User</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {documents.map(({ _id, name, bookId, updatedAt, owner }) => (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{timeago(updatedAt)}</td>
                    <td>{bookId}</td>
                    <td>{owner}</td>
                    <td>
                      <Button
                        bsStyle="primary"
                        onClick={()=>''}
                        block
                      >Details</Button>
                    </td>
                    <td>
                      <Button
                        bsStyle="danger"
                        onClick={() => handleRemove(_id)}
                        block
                      >Done</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> : <Alert bsStyle="warning">No documents yet!</Alert>}
          </div>
        )
  }
}

Available.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('libraries.availableLibraries');
  return {
    loading: !subscription.ready(),
    documents: DocumentsCollection.find().fetch().reverse(),
  };
}, Available);

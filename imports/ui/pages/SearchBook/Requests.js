import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import DocumentsCollection from '../../../api/MyBooks/myBooks';
import Loading from '../../components/Loading/Loading';

import './Requests.scss';



const Requests = ({ loading, documents, match, history }) => (!loading ? (
  <div className="Documents">
    <div className="page-header clearfix">
      <h4 className="pull-left">Recent Requests</h4>
    </div>
    {documents.length ? <Table responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Time</th>
          <th>User</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {documents.map(({ _id, title, owner, updatedAt }) => (
          <tr key={_id}>
            <td>{title}</td>
            <td>{timeago(updatedAt)}</td>
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
                onClick={()=>''}
                block
              >Done</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No documents yet!</Alert>}
  </div>
) : <Loading />);

Requests.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('myBooks');
  return {
    loading: !subscription.ready(),
    documents: DocumentsCollection.find().fetch(),
  };
}, Requests);

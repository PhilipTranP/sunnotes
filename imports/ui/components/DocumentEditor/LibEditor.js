/* eslint-disable max-len, no-return-assign */

import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor';
import _ from 'lodash'
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'
import validate from '../../../modules/validate'
import Documents from '../../../api/Documents/Documents'

class LibEditor extends React.Component {
  constructor(props){
    super(props)
    this.state={
      books: [],
    }
  }
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        bookId: {
          required: true,
        },
        name: {
          required: true,
        }
      },
      messages: {
        bookId: {
          required: 'Need a bookId in here, Seuss.',
        },
        name: {
          required: 'This thneeds a library name, please.',
        }
      },
      submitHandler() { component.handleSubmit(); },
    });
    this.setState({books: this.props.book})
  }

  handleSubmit() {
    const { history } = this.props;
    const existingDocument = this.props.doc && this.props.doc._id;
    const methodToCall = existingDocument ? 'libraries.update' : 'libraries.insert';
    const doc = {
      bookId: this.bookId.value.trim(),
      name: this.name.value.trim(),
      availableStatus: this.availableStatus.value.trim(),
      eLink: this.eLink.value.trim(),
      callNumber: this.callNumber.value.trim(),
      shelvingLocation: this.shelvingLocation.value.trim()
    };
    if (existingDocument) doc._id = existingDocument;

    Meteor.call(methodToCall, doc, (error, documentId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        this.setState({})
      }
    });
  }
  render() {
    const { doc } = this.props;
    const bookId = this.props.bookId
    return (
      <div>
        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <FormGroup>
            <ControlLabel>Book ID</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="bookId"
              ref={bookId => (this.bookId = bookId)}
              defaultValue={doc && doc.bookId}
              placeholder="book id"
              value={bookId._id}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Library Name</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="name"
              ref={name => (this.name = name)}
              defaultValue={doc && doc.name}
              placeholder="library name"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Available Status</ControlLabel>
            <input
              className="form-control"
              name="availableStatus"
              ref={availableStatus => (this.availableStatus = availableStatus)}
              defaultValue={doc && doc.availableStatus}
              placeholder="Available"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Shelving Location</ControlLabel>
            <input
              className="form-control"
              name="shelvingLocation"
              ref={shelvingLocation => (this.shelvingLocation = shelvingLocation)}
              defaultValue={doc && doc.shelvingLocation}
              placeholder="Shelving Location"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Call Number and Holding</ControlLabel>
            <input
              className="form-control"
              name="callNumber"
              ref={callNumber => (this.callNumber = callNumber)}
              defaultValue={doc && doc.callNumber}
              placeholder="Call number and holding"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Electronic Link</ControlLabel>
            <input
              className="form-control"
              name="eLink"
              ref={eLink => (this.eLink = eLink)}
              defaultValue={doc && doc.callNumber}
              placeholder="Electronic link"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">
            {doc && doc._id ? 'Save Changes' : 'Add Library'}
          </Button>
        </form>
      </div>
    );
  }
}


LibEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};


export default LibEditor

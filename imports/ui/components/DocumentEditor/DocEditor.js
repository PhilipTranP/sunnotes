/* eslint-disable max-len, no-return-assign */

import React from 'react'
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Grid, Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'
import validate from '../../../modules/validate'
import Files from '../../../api/Files/files'
import Uploader from '../Uploader'


class DocEditor extends React.Component {
  constructor(props){
    super(props)
    this.state={
    }
  }
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        authors: {
          required: true,
        }
      },
      messages: {
        title: {
          required: 'Need at least title and author(s) to insert a book',
        },
        authors: {
          required: 'Need at least title and author(s) to insert a book',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingDocument = this.props.doc && this.props.doc._id;
    const methodToCall = existingDocument ? 'documents.update' : 'documents.insert';
    const doc = {
      _id: new Meteor.Collection.ObjectID().toHexString(),
      fileId: this.fileId.value.trim(),
      jacket: this.jacket.value.trim(),
      authors: this.authors.value.split( ',' ).map( ( string ) => {
                return string.trim();
              }),
      title: this.title.value.trim(),
      descript: this.descript.value.trim(),
      edition: this.edition.value.trim(),
      content: this.content.value.trim(),
      summary: this.summary.value.trim(),

      subjects: this.subjects.value.split( ',' ).map( ( string ) => {
                return string.trim();
              }),
      ISBNs: this.ISBNs.value.split( ',' ).map( ( string ) => {
                return string.trim();
              }),

    };

    if (existingDocument) doc._id = existingDocument;

    const filterJ =  doc.jacket.substring(doc.jacket.indexOf("Jacket/"), doc.jacket.length -1) //remove the first part of the URL
    const filterJacket =  filterJ.substring(filterJ.indexOf("/")+1, filterJ.indexOf(".")).replace(/[^a-zA-Z]/g, "").toLowerCase()
    const newTitle = doc.title.replace(/[^a-zA-Z]/g, "").toLowerCase()
    if(filterJacket !== newTitle){
      Bert.alert("Book title and its jacket is not matching. Make sure the name of the jacket image the same with the book title!", 'danger')
    } else {
      Meteor.call(methodToCall, doc, (error, documentId) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
          this.form.reset();
          Bert.alert(confirmation, 'success');
          history.push(`/documents/new/${doc._id}`);
        }
      });
    }
  }

  render() {
    const { files } = this.props;
    const getLastUploadedUrl = files.map((file => file.url))
    const getLastUploadedFileId = files.map((file => file._id))
    return (
      <div>
        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <FormGroup>
            <ControlLabel>Uploaded File ID</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="fileId"
              ref={fileId => (this.fileId = fileId)}
              value={getLastUploadedFileId[0]}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Book Jacket</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="jacket"
              ref={jacket => (this.jacket = jacket)}
              value={getLastUploadedUrl[0]}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Authors</ControlLabel>
            <textarea
              className="form-control"
              name="authors"
              ref={authors => (this.authors = authors)}
              placeholder="Sharon Dan, Amita Tran"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <input
              className="form-control"
              name="title"
              ref={title => (this.title = title)}
              placeholder="The Art of Vegan Cooking"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Edition</ControlLabel>
            <input
              className="form-control"
              name="edition"
              ref={edition => (this.edition = edition)}
              placeholder="Second Edition"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Descript</ControlLabel>
            <textarea
              type="text"
              className="form-control"
              name="descript"
              ref={descript => (this.descript = descript)}
              placeholder="326 pages, 32 unnumbered pages of plates : color illustrations ; 25 cm "
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Content</ControlLabel>
            <textarea
              type="text"
              className="form-control"
              name="content"
              ref={content => (this.content = content)}
              placeholder="Introduction -- Chapter1: Mastering the practical pantry -- Chapter 2: Developing a shopping strategy -- Chapter 3: Breakfast -- Chapter 4: Lunch -- Chapter 5: Dinner -- Chapter 6: No more leftovers -- Chapter 7: Special occasions -- Conclusion -- Index. "
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Summary</ControlLabel>
            <textarea
              className="form-control"
              name="summary"
              ref={summary => (this.summary = summary)}
              placeholder="Annie and Dan Shannon, the authors of Betty Goes Vegan, are back. In their new book, they show readers how to cook creatively and thriftily without sacrificing the quality of their food. Inspired by the recipes and cost-saving techniques used during the depression and World War II and paying a vegan homage to Julia Child, the Shannons share their tips and tricks for how to spend less, but get more. With recipes like Korean Kimchi BBQ Burgers, Vegan Yankee Pot Roast, Not-cho Everyday Chili Dogs, and Savannah Pecan Pies, Mastering the Art of Vegan Cooking is a book about making smart choices, not hard ones, so that eating vegan can both be affordable and delicious."
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Subjects</ControlLabel>
            <input
              className="form-control"
              name="subjects"
              ref={subjects => (this.subjects = subjects)}
              placeholder="Vegan Cooking, Cook Book"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>ISBNs</ControlLabel>
            <input
              className="form-control"
              name="ISBNs"
              ref={ISBNs => (this.ISBNs = ISBNs)}
              placeholder="9781455557530, 1455557536"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">
            Add Book Details
          </Button>
        </form>

      </div>
    );
  }
}

DocEditor.defaultProps = {
  doc: { fileId: '', jacket: '', subjects: '', ISBNs:'',  title: '', summary: '', content: '', descript: '', edition: '', authors: '' }
};

DocEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default DocEditor

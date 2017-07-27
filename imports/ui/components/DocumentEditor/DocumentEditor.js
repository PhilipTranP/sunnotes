/* eslint-disable max-len, no-return-assign */

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Grid, Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'
import validate from '../../../modules/validate'
import Files from '../../../api/Files/files'
import Uploader from '../Uploader'

// import Files from '../Files'

class DocumentEditor extends React.Component {
  constructor(props){
    super(props)
    this.state={
      libraryForms: [],
      libraryData: [],
      libraryName: [],
      availableStatus: [],
      libArr: []
    }
    // this.addLibForm = this.addLibForm.bind(this)
    this.renderLibraryInputForm = this.renderLibraryInputForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        summary: {
          required: true,
        },
        author: {
          required: true,
        }
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        summary: {
          required: 'This thneeds a body, please.',
        },
        author: {
          required: 'At least one author, please.'
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  onAddLibraryInputChange(event, index) {
    const target = event.target
    const name = target.name
    let inputData =  {[index]: {
        'name': name,
        'value': target.value
      }}
    const valueInput = inputData[index]
    this.setState({
      libraryData: this.state.libraryData.concat(valueInput)
    })
    // const libraryName = this.state.libraryData.filter((data) => data = data[name]==='name')
    // const availableStatus = this.state.libraryData.filter((data) => data = data[name]==='availableStatus')
    // this.setState({libraryName, availableStatus})
    // console.log(this.state.libraryName)
    //   console.log(this.state.availableStatus)
    // console.log(this.state.libraryData)
    // console.log(librayName)

    // const arr = this.state.libraryData
    // const test = arr.filter((item) => item =  _.findKey(item, 'name'))
    // console.log(test)
    // // console.log(this.state.libraryData)
    //
    // const nameInputs = _.findKey(this.state.libraryData, "name")
    // const valueInputs = _.findKey(this.state.libraryData, 'value')



    // const arr = this.state.libraryData
    //
    // for (var i=0 ; i < index; i++){
    //   let newArray = []
    //   const lastItem = arr.filter((item) => _.get(item, i))
    //   newArray= newArray.concat(lastItem)
    //
    //   console.log(newArray)
    //
    // }
    // const lastItem = arr.filter((item) => _.get(item, 1))
    // console.log(lastItem)

  }

  handleSubmit() {
    const { history } = this.props;
    // console.log(this.state.libraryName)
    // console.log(this.state.availableStatus)

    const libraries = [
                       { name: "Sunnyvale", availableStatus: "AVAILABLE" }
                      ]

    const existingDocument = this.props.doc && this.props.doc._id;
    const methodToCall = existingDocument ? 'documents.update' : 'documents.insert';
    const doc = {
      jacket: this.jacket.value.trim(),
      author: this.author.value.split( ',' ).map( ( string ) => {
                return string.trim();
              }),
      title: this.title.value.trim(),
      // edition: this.edition.value.trim(),
      // content: this.content.value.trim(),
      summary: this.body.value.trim(),

      // subject: this.subject.value.split( ',' ).map( ( string ) => {
      //           return string.trim();
      //         }),
      // ISBN: this.ISBN.value.split( ',' ).map( ( string ) => {
      //           return string.trim();
      //         }),
      libraries: libraries
    };
    console.log(this.author.value)
    console.log(this.author.value.split( ',' ).map( ( string ) => {
              return string.trim();
            }))

    if (existingDocument) doc._id = existingDocument;

    Meteor.call(methodToCall, doc, (error, documentId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/documents/${documentId}`);
      }
    });
  }


  // addLibForm() {
  //   const name = this.state.libraryData.filter((item) => item = item.name==='name')
  //   console.log(name[name.length -1])
  //   const availableStatus = this.state.libraryData.filter((item) => item = item.name==='availableStatus')
  //   console.log(availableStatus[name.length -1])
  //   const libraryForms = this.state.libraryForms.concat(this.renderLibraryInputForm);
  //   this.setState({ libraryForms,  });
  // }

  renderLibraryInputForm(props) {
    return (
         <Grid>
            <Row>
                <Col xs={6} md={3}>
                  <FormGroup>
                    <ControlLabel>Library Name</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={(event, index) => this.onAddLibraryInputChange(event, props.index)}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6} md={2}>
                  <FormGroup>
                    <ControlLabel>Available Status</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      name="availableStatus"
                      onChange={(event, index) => this.onAddLibraryInputChange(event, props.index)}
                    />
                  </FormGroup>
                </Col>
                ...
              </Row>
        </Grid>
       )
  }

  render() {
      const addLibForm = () => {

      const name = this.state.libraryData.filter((item) => item = item.name==='name')
      console.log(name[name.length -1])
      const availableStatus = this.state.libraryData.filter((item) => item = item.name==='availableStatus')
      console.log(availableStatus[name.length -1])
      this.setState({})

      const libraryForms = this.state.libraryForms.concat(this.renderLibraryInputForm);
      this.setState({ libraryForms });
    }

    const libraryForms = this.state.libraryForms.map((Element, index) => {
      return <Element key={ index } index={ index } />
    });

    const { doc, files } = this.props;
    const getLastUploadedUrl = files.map((file => file.url))
    return (
      <div>
        <div style={{marginTop: "100px", marginBottom: "100px"}}>
          <Uploader />
        </div>
        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <FormGroup>
            <ControlLabel>Book Jacket</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="jacket"
              ref={jacket => (this.jacket = jacket)}
              defaultValue={doc && doc.jacket}
              value={getLastUploadedUrl[0]}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Author</ControlLabel>
            <textarea
              className="form-control"
              name="author"
              ref={author => (this.author = author)}
              defaultValue={doc && doc.author}
              placeholder="Sharon Dan, Amita Tran"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <input
              className="form-control"
              title="title"
              ref={title => (this.title = title)}
              defaultValue={doc && doc.title}
              placeholder="The Art of Vegan Cooking"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Edition</ControlLabel>
            <input
              className="form-control"
              name="edition"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Descript</ControlLabel>
            <textarea
              type="text"
              className="form-control"
              name="descript"
              placeholder="326 pages, 32 unnumbered pages of plates : color illustrations ; 25 cm "
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Contents</ControlLabel>
            <textarea
              type="text"
              className="form-control"
              name="jacket"
              placeholder="Introduction -- Chapter1: Mastering the practical pantry -- Chapter 2: Developing a shopping strategy -- Chapter 3: Breakfast -- Chapter 4: Lunch -- Chapter 5: Dinner -- Chapter 6: No more leftovers -- Chapter 7: Special occasions -- Conclusion -- Index. "
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Summary</ControlLabel>
            <textarea
              className="form-control"
              name="body"
              ref={body => (this.body = body)}
              defaultValue={doc && doc.summary}
              placeholder="Annie and Dan Shannon, the authors of Betty Goes Vegan, are back. In their new book, they show readers how to cook creatively and thriftily without sacrificing the quality of their food. Inspired by the recipes and cost-saving techniques used during the depression and World War II and paying a vegan homage to Julia Child, the Shannons share their tips and tricks for how to spend less, but get more. With recipes like Korean Kimchi BBQ Burgers, Vegan Yankee Pot Roast, Not-cho Everyday Chili Dogs, and Savannah Pecan Pies, Mastering the Art of Vegan Cooking is a book about making smart choices, not hard ones, so that eating vegan can both be affordable and delicious."
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Subject</ControlLabel>
            <input
              className="form-control"
              name="subject"
              placeholder="Vegan Cooking, Cook Book"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>ISBN</ControlLabel>
            <input
              className="form-control"
              name="ISBN"
              placeholder="9781455557530, 1455557536"
            />
          </FormGroup>
          <h3>Add Libraries Info</h3>
          <hr />
          <div style={{paddingBottom: "30px"}}>
            { libraryForms }
          </div>
          <Button  bsStyle="default" className="pull-right" onClick={() => addLibForm()}>Insert Library Data</Button>
           <hr />
          <Button type="submit" bsStyle="success">
            {doc && doc._id ? 'Save Changes' : 'Add Document'}
          </Button>
        </form>

      </div>
    );
  }
}

DocumentEditor.defaultProps = {
  doc: { title: '', body: '' },
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('files');
  return {
    loading: !subscription.ready(),
    files: Files.find({ userId: Meteor.userId() }).fetch().reverse()
  };
}, DocumentEditor);

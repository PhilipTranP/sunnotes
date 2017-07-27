/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';


const Documents = new Mongo.Collection('Documents');

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  fileId: {
    type: String,
    label: 'The title of the document.',
    optional: true
  },
  jacket: {
    type: String,
    label: 'URL of the jacket'
  },
  authors: {
    type: [ String ],
    label: 'The authors of the document.'
  },
  title: {
    type: String,
    label: 'The title of the document.'
  },
  content: {
    type: String,
    label: 'The content of the document.',
    optional: true
  },
  subjects: {
    type: [ String ],
    label: 'The subject of the document.',
    optional: true
  },
  ISBNs: {
    type: [ String ],
    label: 'The ISBN of the document.',
    optional: true
  },
  edition: {
    type: String,
    label: 'The edition of the book.',
    optional: true
  },
  descript: {
    type: String,
    label: 'The descript of the document.',
    optional: true
  },
  summary: {
    type: String,
    label: 'The body of the document.',
    optional: true
  }
});

Documents.attachSchema(Documents.schema);

export default Documents;

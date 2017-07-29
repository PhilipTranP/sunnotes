/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';


const MyBooks = new Mongo.Collection('MyBooks');

MyBooks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

MyBooks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

MyBooks.schema = new SimpleSchema({
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
  title: {
    type: String,
    label: 'The data of the document.',
    optional: true
  }
});

MyBooks.attachSchema(MyBooks.schema);

export default MyBooks;

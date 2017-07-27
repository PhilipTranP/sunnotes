import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Libraries = new Mongo.Collection('Libraries');

Libraries.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Libraries.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const LibrariesSchema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  bookId: {
    type: String,
    label: 'The ID of the book info',
  },
  name: {
    type: String,
    label: 'Book name',
  },
  availableStatus: {
    type: String,
    label: 'Available status',
    optional: true
  },
  shelvingLocation: {
    type: String,
    label: 'Shelving location',
    optional: true
  },
  callNumber: {
    type: String,
    label: 'Call number for book holding',
    optional: true
  },
  eLink: {
    type: String,
    label: 'Electronic link',
    optional: true
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
  }
});

Libraries.attachSchema(LibrariesSchema);

export default Libraries;

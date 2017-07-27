import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../Documents';

Meteor.publish('documents', function documents() {
  return Documents.find({ owner: this.userId }, {sort: {createdAt: -1}, limit: 20});
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('documents.view', function documentsView(documentId) {
  check(documentId, String);
  return Documents.find({ _id: documentId, owner: this.userId });
});

Meteor.publish('book.lastUploaded', () => Documents.find({}, {sort: {createdAt: -1}, limit: 5}));

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import MyBooks from '../myBooks.js';

Meteor.publish('myBooks', function myBooks() {
  return MyBooks.find({}, {sort: {createdAt: -1}, limit: 20});
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('myBooks.view', function myBooksView(bookId) {
  check(bookId, String);
  return MyBooks.find({ _id: bookId, owner: this.userId });
});

// Meteor.publish('myBook.lastUploaded', () => Documents.find({}, {sort: {createdAt: -1}, limit: 5}));

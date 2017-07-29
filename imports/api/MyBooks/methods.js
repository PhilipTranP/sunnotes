import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import MyBooks from './myBooks';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'myBooks.insert': function myBooksInsert(book) {
    check(book, {
      _id: String,
       title: String
    });

    try {
      return MyBooks.insert({ owner: this.userId, ...book });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'myBooks.update': function myBooksUpdate(book) {
    check(book, {
      _id: String,
      title: String
    });

    try {
      const bookId = book._id;
      MyBooks.update(bookId, { $set: book });
      return bookId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'myBooks.remove': function myBooksRemove(bookId) {
    check(bookId, String);

    try {
      return MyBooks.remove(bookId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'myBooks.insert',
    'myBooks.update',
    'myBooks.remove',
  ],
  limit: 5,
  timeRange: 1000,
});

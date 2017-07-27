import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Libraries from './libraries';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'libraries.insert': function librariesInsert(doc) {
    check(doc, {
      bookId: String,
      name: String,
      availableStatus: String,
      shelvingLocation: String,
      callNumber: String,
      eLink: String
    });

    try {
      return Libraries.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'libraries.update': function librariesUpdate(doc) {
    check(doc, {
      _id: String,
      bookId: String,
      name: String,
      availableStatus: String,
      shelvingLocation: String,
      callNumber: String,
      eLink: String
    });

    try {
      const documentId = doc._id;
      Libraries.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'libraries.remove': function librariesRemove(documentId) {
    check(documentId, String);

    try {
      return Libraries.remove(documentId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'libraries.insert',
    'libraries.update',
    'libraries.remove',
  ],
  limit: 5,
  timeRange: 1000,
});

import { Meteor } from 'meteor/meteor';
import Files from '../files';

Meteor.publish('files', () => Files.find({}, {sort: {createdAt: -1}, limit: 1}));

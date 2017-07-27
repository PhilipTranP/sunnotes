import { Meteor } from 'meteor/meteor';
import Libraries from '../libraries';

Meteor.publish('libraries', () => Libraries.find());

import { Meteor } from 'meteor/meteor';
import Libraries from '../libraries';
import Documents from '../../Documents/Documents';

Meteor.publish('libraries', () => Libraries.find());

Meteor.publish('libraries.availableBook', () => {

  const library = Libraries.find({"name": "Sunnyvale", "availableStatus": "Available"})
  return library
 }
);

Meteor.publish('libraries.availableLibraries', () => {

  const library = Libraries.find({"availableStatus": "Available"})
  return library
 }
);

// Meteor.publish(null, function() {
//     const library = Libraries.find({"availableStatus": "Available"}).reverse()
//     return Meteor.users.find({_id: this.library[0].owner}, {fields: { emails: 1, profile: 1 } });
// });

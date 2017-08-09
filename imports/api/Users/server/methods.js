import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import editProfile from './edit-profile';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'users.sendVerificationEmail': function usersResendVerification() {
    return Accounts.sendVerificationEmail(this.userId);
  },
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      password: Match.Optional(Object),
      profile: {
        phone: String,
        city: String,
        name: {
          first: String,
          last: String,
        },
      },
    });

    return editProfile({ userId: this.userId, profile })
    .then(response => response)
    .catch((exception) => {
      throw new Meteor.Error('500', exception);
    });
  },
});

rateLimit({
  methods: [
    'users.editProfile',
  ],
  limit: 5,
  timeRange: 1000,
});

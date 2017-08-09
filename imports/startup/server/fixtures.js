import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/Documents/Documents';

const documentsSeed = userId => ({
  collection: Documents,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 5,
  model(dataIndex) {
    return {
      owner: userId,
      title: `Document #${dataIndex + 1}`,
      body: `This is the body of document #${dataIndex + 1}`,
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'philipTranP@gmail.com',
    password: '654321',
    profile: {
      name: {
        first: 'Philip',
        last: 'Tran',
      },
    },
    roles: ['admin'],
    data(userId) {
      localStorage.setItem('token', userId)
      return documentsSeed(userId);
    },
  }],
  modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        localStorage.setItem('token', userId)
        return documentsSeed(userId);
      },
    };
  },
});

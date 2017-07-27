import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import Files from '../../api/Files/files';

Slingshot.fileRestrictions('Uploader', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/gif', 'image/svg+xml'],
  maxSize: 1 * 1024 * 1024, // 1MB limit (use null for unlimited)
});

Slingshot.createDirective('Uploader', Slingshot.S3Storage, {
  bucket: 'sunnotes',
  acl: 'public-read',
  region: 'us-west-1',
  AWSAccessKeyId: Meteor.settings.private.aws.AWSAccessKeyId,
  AWSSecretAccessKey: Meteor.settings.private.aws.AWSSecretAccessKey,
  authorize() {
    if (!this.userId) throw new Meteor.Error('need-login', 'You need to be logged in to upload files!');
    const userFileCount = Files.find({ userId: this.userId }).count();
    return userFileCount < 300;
  },
  key(file) {
    const user = Meteor.users.findOne(this.userId);
    return `${user._id}/Jacket/${file.name}`;
  },
});

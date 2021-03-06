import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';

AWS.config = new AWS.Config();

AWS.config.accessKeyId = Meteor.settings.private.aws.AWSAccessKeyId;
AWS.config.secretAccessKey = Meteor.settings.private.aws.AWSSecretAccessKey;

const s3 = new AWS.S3();

export default {
  deleteFile(file, callback) {
    const sanitizedEmailAddress = encodeURIComponent(file.emailAddress);
    const sanitizedFileName = s3PublicUrl(file.fileName);
    const sanitizedUrl = file.url.replace(sanitizedEmailAddress, file.emailAddress).replace(sanitizedFileName, file.fileName);

    s3.deleteObject({
      Bucket: 'sunnotes',
      Key: sanitizedUrl.replace('https://s3-us-west-1.amazonaws.com/', ''),
    }, Meteor.bindEnvironment((error) => {
      if (error) console.warn(error);
      if (!error && callback) callback(file.url);
    }));
  },
};

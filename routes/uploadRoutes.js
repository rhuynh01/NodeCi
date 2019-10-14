const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'rh-tulsa-blog',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        // console.log('key: ', key);
        // console.log('url: ', url);
        res.send({ key, url });
      }
    );
  });
};

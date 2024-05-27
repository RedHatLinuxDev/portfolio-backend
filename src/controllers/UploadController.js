const AWS = require('aws-sdk');
const getPresignedUrl = async (req,res) => {
    try {
      const { fileName, folderName } = req.body;
      const credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      };
      AWS.config.update({
        credentials: credentials,
        region: process.env.AWS_REGION,
        signatureVersion: 'v4',
      });
      const s3 = new AWS.S3();
      const key = folderName ? `${folderName}/${fileName}` : fileName;
      const params = {
        Bucket: process.env.S3BucketName,
        Key: key,
        Expires: 3600,
        ContentType: 'image/*',
      };
      const presignedPutUrl = s3.getSignedUrl('putObject', params);
      
      res.json({ msg: 'Presigned Url Created ', data: presignedPutUrl });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error. Issue in uploading file' });
    }
  }

  module.exports = {
    getPresignedUrl
  }
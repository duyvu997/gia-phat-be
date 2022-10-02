const uploadToS3 = require('../../common/upload-s3');

const upload = async (req, res, next) => {
  const { tags = 'notag' } = req.body || {};
  const { file } = req.files || {};

  if (!file) {
    return res.status(400).send({ ok: false, message: 'missing file' });
  }

  const result = await uploadToS3(file, tags, false);

  return res.status(201).send({ ok: true, message: 'created', data: result });
};

module.exports = {
  upload,
};

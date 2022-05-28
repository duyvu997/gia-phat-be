const getMe = (req, res, next) => {
  return res.status(200).json({ name: 'david' });
};

module.exports =  { getMe };

const hasRoles = (roles) => (req, res, next) => {
  const user = req.decodedUser;
  if (!roles.includes(user.role)) {
    return res.status(401).json({ message: "unauthorized, you not have permission to do" });
  }
  return next();
};

module.exports = { hasRoles };

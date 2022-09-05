const employeeService = require('./employee-service');

const getMe = (req, res, next) => {
  return res.status(200).json({ name: 'david' });
};

const getAll = async (req, res, next) => {
  const result = await employeeService.getAll();

  return res.status(200).json({ data: result });
};

const login = (req, res, next) => {
  return res.status(200).json({
    data: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      name: '123',
    },
  });
};

const create = async (req, res, next) => {
  const employee = req.body;
  const result = await employeeService.create(employee);

  return res.status(200).json({ data: result });
};

const update = async (req, res, next) => {
  const employee = req.body;
  const result = await employeeService.update(employee);

  return res.status(200).json({ data: result });
};

const deleteEmployee = (req, res, next) => {
  return res.status(200).json({ data: 'not supported' });
};

const getById = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  const result = await employeeService.getById(employeeId);

  return res.status(200).json({ data: result });
};

module.exports = {
  getMe,
  getAll,
  login,
  create,
  update,
  deleteEmployee,
  getById,
};

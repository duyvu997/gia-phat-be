const {
  createError,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../../common/error-utils');
const { Employee } = require('../../models');

const create = async (employee) => {
  const {
    username,
    password,
    first_name,
    last_name,
    full_name,
    phone,
    birthday,
    role,
    joined_date,
    avatar,
  } = employee;

  const isExist = await Employee.findOne({ username });

  if (isExist) {
    throw createError(BAD_REQUEST, 'username already exists');
  }

  return Employee.create({
    username,
    password,
    first_name,
    last_name,
    full_name,
    phone,
    birthday,
    role,
    joined_date,
    avatar,
  });
};

const update = async (employee) => {
  const {
    username,
    password,
    first_name,
    last_name,
    full_name,
    phone,
    birthday,
    role,
    joined_date,
    avatar,
  } = employee;

  const savedUser = await Employee.findOne({ username });

  if (!savedUser) {
    throw createError(NOT_FOUND, 'employee not found');
  }

  return Employee.update(savedUser.id, {
    username,
    password,
    first_name,
    last_name,
    full_name,
    phone,
    birthday,
    role,
    joined_date,
    avatar,
  });
};

const getAll = async () => {
  return Employee.find({});
};

const getById = async (employeeId) => {
  return Employee.findOne({ id: employeeId });
};

module.exports = { create, update, getAll, getById };
